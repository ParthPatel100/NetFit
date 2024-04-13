const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const Post = require("../MongoDB/schema/post")
const User = require("../MongoDB/schema/user")
const Comment = require("../MongoDB/schema/comment")
const Workout = require("../MongoDB/schema/workout")
const SavedWorkout = require("../MongoDB/schema/saved_workouts")

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/getComments/:comments', async (req, res) => {
    const commentIds = req.params.comments.split(','); 

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const comments = await Promise.all(commentIds.map(async (commentId) => {
            const comment = await Comment.findById(commentId);
            return comment ? comment : null;
        }));

        res.status(200).json(comments.filter(comment => comment !== null));
    } catch (error) {
        console.error('Error finding comments:', error);
        res.status(500).json({ error: "Internal Serve Error" });
    }
});


router.get('/getFollower', async (req, res) => {
    const username = req.user.name

   //const username = "john_doe"; 

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const user = await User.findOne({ username: username  });
        if (user) {
            console.log("User found!", user)
            return res.status(200).json(user);
        } else {
            console.log('No user found for the user with ID:',user);
            return res.status(200).json({ error: "No user found for the user" });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getFollowingPosts', async (req, res) => {

   await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const post = await Post.find();
        if (post) {
            return res.status(200).json(post);
        } else {
            console.log('No posts found: ',post);
            return res.status(200).json({ error: "No user found for the user" });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/postComment', async (req, res) => {
    const username = req.user.id

    try {
        const {description, _id } = req.body;
        const newComment = new Comment({
            username, 
            description,
            likes: 1 
        });

        const savedComment = await newComment.save();
        await Post.findByIdAndUpdate(_id, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/deleteUser', async (req,res) =>{
    const id = req.body.id
    try {
        await Comment.deleteMany({'username':id})
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error('Error deleting user comments', error);
    }
    try {
        await Post.deleteMany({'trainerUsername':id});
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error('Error deleting user posts', error);
    }
    try{
        await User.deleteOne({'_id':id})
    }
    catch (error){
        res.status(500).json({ error: "Internal Server Error" });
        console.error('Error deleting ')
    }
    res.status(200).json("User Deleted");
})
router.post('/deletePost', async (req,res) =>{
    const id = req.body.id
    console.log("Idhere: ", id)
    try {
        await Post.deleteOne({'_id':id});
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error('Error deleting user posts', error);
    }
    res.status(200).json("Post Deleted");
})
router.put('/updateLikes/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } }, 
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating likes count:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



router.get('/getName/:userId', async (req, res) => {
    const userId = req.params.userId;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);


    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ username: user.username });
    } catch (error) {
        console.error('Error getting user name:', error);
        res.status(500).json({ error: 'Internal Serve Error' });
    }
});



router.get('/getWorkout/:workout', async (req, res) => {
    const workoutIds = req.params.workout.split(',');
    console.log("wID!", workoutIds);

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const workouts = await Promise.all(workoutIds.map(async (workoutId) => {
            const workout = await Workout.findById(workoutId);
            console.log("workout!", workout);
            return workout ? workout : null;

        }));
        res.status(200).json(workouts.filter(workout => workout !== null));
    } catch (error) {
        console.error('Error finding workout:', error);
        res.status(500).json({ error: "Internal Serve Error" });
    }
});

router.get('/getSavedWorkouts', async (req, res) => {
    const userId = req.user.id
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
    try {

      let savedWorkouts = await SavedWorkout.findOne({ user: userId });
      if(savedWorkouts==null){
          savedWorkouts = []
      }
      res.status(200).json(savedWorkouts);
      
    } catch (error) {
      console.error('Error Getting Saved Workouts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/getUsername/:userId', async (req, res) => {
    const userId = req.params.userId; 
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/removeSavedWorkout/:_id', async (req, res) => {
    
    try {
        const postId = req.params._id;
        const userId = req.user.id;

        const savedWorkout = await SavedWorkout.findOne({ user: userId });

        if (!savedWorkout) {
            return res.status(404).json({ error: 'Saved workout not found' });
        }

        savedWorkout.post_id.pull(postId);

        await savedWorkout.save();
        res.status(200).json({ message: 'Post removed from saved workouts' });
    } catch (error) {
        console.error('Error removing saved workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/addSavedWorkout/:_id', async (req, res) => {
    try {
        const postId = req.params._id;
        const userId = req.user.id;

        let savedWorkout = await SavedWorkout.findOne({ user: userId });

        if (!savedWorkout) {
            savedWorkout = new SavedWorkout({ user: userId, post_id: [] });
        }

        savedWorkout.post_id.push(postId);
        await savedWorkout.save();

        res.status(200).json({ message: 'Post added to saved workouts' });
    } catch (error) {
        console.error('Error adding saved workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getMyPosts', async (req, res) => {
    const username = req.user.id;

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);

    try {
        const userPosts = await Post.find({trainerUsername: username });

        if (userPosts.length > 0) {
            return res.status(200).json(userPosts);
        } else {
            console.log('No posts found for the user:', username);
            return res.status(200).json(userPosts);
            //return res.status(404).json({ error: "No posts found for the user" });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getMyID', async (req, res) => {
    const username = req.user.id;

    return res.status(200).json(username);
});

router.put('/addFollow/:trainerUsername', async (req, res) => {
    try {
        
        const trainerId = req.params.trainerUsername;
        console.log('add Follow this: ', trainerId);
        const userId = req.user.id;

        let savedFollower = await User.findOne({ _id: userId });
        console.log("add follow was tjere?: ", savedFollower);

        savedFollower.following_list.push(trainerId);
        await savedFollower.save();

        res.status(200).json({ message: 'Trainer added to following' });
    } catch (error) {
        console.error('Error adding trainer to following', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/removeFollow/:trainerUsername', async (req, res) => {
    try {
        const trainerId = req.params.trainerUsername;
        console.log('remove Follow this: ', trainerId);
        const userId = req.user.id;

        let savedFollower = await User.findOne({ _id: userId });
        console.log("Remove follow was there?: ", savedFollower);

        savedFollower.following_list.pull(trainerId);
        await savedFollower.save();

        res.status(200).json({ message: 'Trainer removed from following' });
    } catch (error) {
        console.error('Error removing trainer from following', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getDict', async (req, res) => {

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
 
     try {
         const user = await User.find();
         if (user) {
             return res.status(200).json(user);
         } else {
             console.log('No posts found: ',user);
             return res.status(200).json({ error: "No user found for the user" });
         }
     } catch (error) {
         console.error('Error finding user:', error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
 });

 router.get('/getTrainerDict', async (req, res) => {

    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/app_db?authSource=admin`);
 
     try {
         const user = await User.find({ user_role: { $ne: 'user' } });
         if (user) {
             return res.status(200).json(user);
         } else {
             console.log('No posts found: ',user);
             return res.status(200).json({ error: "No user found for the user" });
         }
     } catch (error) {
         console.error('Error finding user:', error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
 });


module.exports = router