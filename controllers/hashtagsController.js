const Hashtag = require('../models/Hashtag')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all hashtags 
// @route GET /hashtags
// @access Private
const getAllHashtags = asyncHandler(async (req, res) => {
    // Get all hashtags from MongoDB
    const hashtags = await Hashtag.find({title: {$regex: req.query.query} }).lean()

    // If no hashtags 
    if (!hashtags?.length) {
        return res.status(400).json({ message: 'No hashtags found' })
    }

    // Add username to each hashtag before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const hashtagsWithUser = await Promise.all(hashtags.map(async (hashtag) => {
        
        if(hashtag.user){
            const user = await User.findById(hashtag.user).lean().exec();
            return { ...hashtag, username:user.username  };
        }
        return { ...hashtag }
    }))

    res.json(hashtagsWithUser)
})

// @desc Create new hashtag
// @route POST /hashtags
// @access Private
const createNewHashtag = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Hashtag.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate hashtag title' })
    }

    // Create and store the new user 
    const hashtag = await Hashtag.create({ user, title, text })

    if (hashtag) { // Created 
        return res.status(201).json({ message: 'New hashtag created' })
    } else {
        return res.status(400).json({ message: 'Invalid hashtag data received' })
    }

})

// @desc Update a hashtag
// @route PATCH /hashtags
// @access Private
const updateHashtag = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm hashtag exists to update
    const hashtag = await Hashtag.findById(id).exec()

    if (!hashtag) {
        return res.status(400).json({ message: 'Hashtag not found' })
    }

    // Check for duplicate title
    const duplicate = await Hashtag.findOne({ title }).lean().exec()

    // Allow renaming of the original hashtag 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate hashtag title' })
    }

    hashtag.user = user
    hashtag.title = title
    hashtag.text = text
    hashtag.completed = completed

    const updatedHashtag = await hashtag.save()

    res.json(`'${updatedHashtag.title}' updated`)
})

// @desc Delete a hashtag
// @route DELETE /hashtags
// @access Private
const deleteHashtag = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Hashtag ID required' })
    }

    // Confirm hashtag exists to delete 
    const hashtag = await Hashtag.findById(id).exec()

    if (!hashtag) {
        return res.status(400).json({ message: 'Hashtag not found' })
    }

    const result = await hashtag.deleteOne()

    const reply = `Hashtag '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllHashtags,
    createNewHashtag,
    updateHashtag,
    deleteHashtag
}