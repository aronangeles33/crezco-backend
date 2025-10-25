import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import logger, { logPayment, logSuspicious } from '../config/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Sanitización básica para mensajes
const sanitizeHTML = (str) => {
  if (!str) return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// POST /api/donations/create-payment-intent
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { projectId, amount, message, anonymous = false } = req.body;

    // Sanitizar mensaje
    const sanitizedMessage = message ? sanitizeHTML(message) : '';
    
    // Detectar intentos XSS en mensaje
    if (message && message !== sanitizedMessage) {
      logSuspicious('XSS attempt in donation message', req.ip, {
        userId: req.user._id,
        projectId,
        original: message,
        sanitized: sanitizedMessage
      });
    }

    // Validaciones (ya cubiertas por validators)
    if (!projectId || !amount) {
      return res.status(400).json({ 
        message: 'Proyecto y monto son requeridos' 
      });
    }

    if (amount < 5) {
      logSuspicious('Donation below minimum', req.ip, {
        userId: req.user._id,
        amount,
        projectId
      });
      return res.status(400).json({ 
        message: 'El monto mínimo es 5€' 
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    if (project.status !== 'active') {
      return res.status(400).json({ 
        message: 'Este proyecto ya no acepta donaciones' 
      });
    }

    // Crear o recuperar Stripe Customer
    let stripeCustomerId = req.user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
        metadata: {
          userId: req.user._id.toString(),
        },
      });
      stripeCustomerId = customer.id;
      
      await User.findByIdAndUpdate(req.user._id, { 
        stripeCustomerId: customer.id 
      });
      
      logger.info(`Stripe customer created for user ${req.user.email}`);
    }

    // Crear Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: 'eur',
      customer: stripeCustomerId,
      metadata: {
        projectId: projectId.toString(),
        userId: req.user._id.toString(),
        message: sanitizedMessage,
        anonymous: anonymous.toString(),
      },
      description: `Donación para: ${project.title}`,
    });

    // Crear registro de donación (pendiente hasta confirmación)
    const donation = await Donation.create({
      amount,
      donor: req.user._id,
      project: projectId,
      message: sanitizedMessage,
      anonymous,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    logPayment('Payment intent created', req.user._id, amount, projectId, true, {
      paymentIntentId: paymentIntent.id,
      donationId: donation._id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/donations/project/:projectId
export const getDonationsByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const donations = await Donation.find({
      project: projectId,
      status: 'succeeded',
    })
      .populate('donor', 'name avatar')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Ocultar donante si es anónimo
    const sanitizedDonations = donations.map(donation => {
      if (donation.anonymous) {
        return {
          ...donation,
          donor: {
            name: 'Anónimo',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous',
          },
        };
      }
      return donation;
    });

    const count = await Donation.countDocuments({
      project: projectId,
      status: 'succeeded',
    });

    res.json({
      donations: sanitizedDonations,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/donations/user/me
export const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({
      donor: req.user._id,
      status: 'succeeded',
    })
      .populate('project', 'title media creator')
      .populate({
        path: 'project',
        populate: {
          path: 'creator',
          select: 'name avatar',
        },
      })
      .sort('-createdAt')
      .lean();

    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

    res.json({
      donations,
      totalDonated,
      count: donations.length,
    });
  } catch (error) {
    next(error);
  }
};
