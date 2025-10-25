import User from '../models/User.js';
import Project from '../models/Project.js';
import Donation from '../models/Donation.js';

// GET /api/users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/me
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, bio, socialLinks, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...(name && { name }),
          ...(bio && { bio }),
          ...(socialLinks && { socialLinks }),
          ...(avatar && { avatar }),
        },
      },
      { new: true, runValidators: true }
    ).select('-__v');

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/projects
export const getUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ creator: req.user._id })
      .sort('-createdAt')
      .lean();

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/badges
export const getUserBadges = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('badges totalDonated');
    
    const uniqueProjects = await Donation.distinct('project', {
      donor: req.user._id,
      status: 'succeeded',
    });

    const BADGE_DETAILS = {
      'first-donation': {
        name: 'Primera Donación',
        description: 'Realizaste tu primera donación',
        icon: '🎉',
        rarity: 'common',
      },
      'generous': {
        name: 'Generoso',
        description: 'Donaste más de 50€ en total',
        icon: '💝',
        rarity: 'uncommon',
      },
      'super-supporter': {
        name: 'Super Supporter',
        description: 'Donaste más de 100€ en total',
        icon: '⭐',
        rarity: 'rare',
      },
      'patron': {
        name: 'Mecenas',
        description: 'Donaste más de 500€ en total',
        icon: '👑',
        rarity: 'epic',
      },
      'philanthropist': {
        name: 'Filántropo',
        description: 'Donaste más de 1000€ en total',
        icon: '💎',
        rarity: 'legendary',
      },
      'community-builder': {
        name: 'Constructor de Comunidad',
        description: 'Apoyaste 5 proyectos diferentes',
        icon: '🏗️',
        rarity: 'rare',
      },
      'early-supporter': {
        name: 'Early Supporter',
        description: 'Apoyaste un proyecto en sus primeros días',
        icon: '🚀',
        rarity: 'uncommon',
      },
    };

    const badgesWithDetails = user.badges.map(badgeKey => ({
      key: badgeKey,
      ...BADGE_DETAILS[badgeKey],
    }));

    res.json({
      badges: badgesWithDetails,
      stats: {
        totalDonated: user.totalDonated,
        projectsSupported: uniqueProjects.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
