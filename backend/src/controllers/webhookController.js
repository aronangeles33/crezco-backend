import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BADGES = {
  'first-donation': { criteria: 1 },
  'generous': { criteria: 50 },
  'super-supporter': { criteria: 100 },
  'patron': { criteria: 500 },
  'philanthropist': { criteria: 1000 },
  'community-builder': { criteria: 5 }, // 5 proyectos diferentes
  'early-supporter': { criteria: 1 }, // Primera donación en primeros 7 días del proyecto
};

const checkAndAwardBadges = async (userId, newTotalDonated, projectCount) => {
  const user = await User.findById(userId);
  const newBadges = [...user.badges];
  let badgesAwarded = [];

  // Badge por total donado
  if (newTotalDonated >= 1000 && !newBadges.includes('philanthropist')) {
    newBadges.push('philanthropist');
    badgesAwarded.push('philanthropist');
  } else if (newTotalDonated >= 500 && !newBadges.includes('patron')) {
    newBadges.push('patron');
    badgesAwarded.push('patron');
  } else if (newTotalDonated >= 100 && !newBadges.includes('super-supporter')) {
    newBadges.push('super-supporter');
    badgesAwarded.push('super-supporter');
  } else if (newTotalDonated >= 50 && !newBadges.includes('generous')) {
    newBadges.push('generous');
    badgesAwarded.push('generous');
  } else if (newTotalDonated >= 1 && !newBadges.includes('first-donation')) {
    newBadges.push('first-donation');
    badgesAwarded.push('first-donation');
  }

  // Badge por proyectos diferentes
  if (projectCount >= 5 && !newBadges.includes('community-builder')) {
    newBadges.push('community-builder');
    badgesAwarded.push('community-builder');
  }

  if (badgesAwarded.length > 0) {
    await User.findByIdAndUpdate(userId, { badges: newBadges });
  }

  return badgesAwarded;
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

async function handlePaymentSuccess(paymentIntent) {
  try {
    const { id, metadata } = paymentIntent;
    const { projectId, userId, message, anonymous } = metadata;

    // Actualizar donación a succeeded
    const donation = await Donation.findOneAndUpdate(
      { stripePaymentIntentId: id },
      { status: 'succeeded' },
      { new: true }
    );

    if (!donation) {
      console.error('Donación no encontrada:', id);
      return;
    }

    // Actualizar proyecto
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $inc: { 
          currentAmount: donation.amount,
          donors: 1,
        },
      },
      { new: true }
    );

    // Si alcanzó el objetivo, cambiar status
    if (project.currentAmount >= project.goalAmount) {
      project.status = 'funded';
      await project.save();
    }

    // Actualizar totalDonated del usuario
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalDonated: donation.amount } },
      { new: true }
    );

    // Verificar badges
    const uniqueProjects = await Donation.distinct('project', {
      donor: userId,
      status: 'succeeded',
    });

    const badgesAwarded = await checkAndAwardBadges(
      userId,
      user.totalDonated,
      uniqueProjects.length
    );

    // Emitir eventos Socket.IO
    const io = global.io;
    if (io) {
      // Notificar al creador
      io.to(`user_${project.creator}`).emit('new_donation', {
        projectId: project._id,
        amount: donation.amount,
        donor: anonymous === 'true' ? 'Anónimo' : user.name,
        message: message || '',
      });

      // Notificar al donante sobre badges
      if (badgesAwarded.length > 0) {
        io.to(`user_${userId}`).emit('badge_awarded', {
          badges: badgesAwarded,
        });
      }

      // Broadcast actualización del proyecto
      io.to(`project_${projectId}`).emit('project_updated', {
        currentAmount: project.currentAmount,
        donors: project.donors,
        percentageFunded: project.percentageFunded,
      });
    }

    console.log('✅ Pago procesado exitosamente:', id);
  } catch (error) {
    console.error('❌ Error procesando pago exitoso:', error);
  }
}

async function handlePaymentFailed(paymentIntent) {
  try {
    const { id } = paymentIntent;

    await Donation.findOneAndUpdate(
      { stripePaymentIntentId: id },
      { status: 'failed' }
    );

    console.log('⚠️ Pago fallido:', id);
  } catch (error) {
    console.error('❌ Error procesando pago fallido:', error);
  }
}
