const Link = require('../models/Link');
const { getLinkPreview } = require('link-preview-js');

exports.createLink = async (req, res, next) => {
  try {
    const { url } = req.body;
    let title = '';
    let description = '';
    let image = '';

    try {
      const metadata = await getLinkPreview(url);
      title = metadata.title || '';
      description = metadata.description || '';
      if (metadata.images && metadata.images.length > 0) {
        image = metadata.images[0];
      }
    } catch (previewError) {
      // Fallback if metadata cannot be fetched
      title = url;
      description = 'No preview available for this URL';
      image = '';
    }

    const link = await Link.create({
      userId: req.user._id,
      url,
      title,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      link,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    const links = await Link.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: links.length,
      links,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }

    if (link.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this link' });
    }

    await link.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Link deleted',
    });
  } catch (error) {
    next(error);
  }
};
