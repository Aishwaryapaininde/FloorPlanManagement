const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const port = 8000;

app.listen(port,()=>{
  console.log(`Server listening at http://localhost:$3000`);
})

const mongoose = require("mongoose");
const uri = "mongodb+srv://deepanshidey03:ZmYkKdDeo6YDiJDt@cluster0.kwz2v2j.mongodb.net/IFMS";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));
const floorPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  seats: [{
    seatNumber: {
      type: Number,
      required: true
    },
    occupied: {
      type: Boolean,
      default: false
    }
  }],
  rooms: [{
    roomNumber: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    booked: {
      type: Boolean,
      default: false
    }
  }],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FloorPlan = mongoose.model("FloorPlan", floorPlanSchema);
const User = mongoose.model('User', userSchema);


app.get('/floorplans', async (req, res) => {
  try {
    const floorPlans = await FloorPlan.find();
    res.json(floorPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/floorplans/:id', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findById(req.params.id);
    if (floorPlan) {
      res.json(floorPlan);
    } else {
      res.status(404).json({ message: 'Floor plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/add-floorplan', async (req, res) => {
  const floorPlan = new FloorPlan(req.body);
  try {
    const newFloorPlan = await floorPlan.save();
    res.status(201).json(newFloorPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.put('/update-floorplan/:id', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (floorPlan) {
      res.json(floorPlan);
    } else {
      res.status(404).json({ message: 'Floor plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update a floor plan by ID
app.patch('/update-floorplan/:id', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (floorPlan) {
      res.json(floorPlan);
    } else {
      res.status(404).json({ message: 'Floor plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch('/floorplans/:id/seats/:seatNumber', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findById(req.params.id);
    if (!floorPlan) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }
    const seatIndex = floorPlan.seats.findIndex(seat => seat.seatNumber === req.params.seatNumber);
    if (seatIndex === -1) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    floorPlan.seats[seatIndex] = { ...floorPlan.seats[seatIndex], ...req.body };
    await floorPlan.save();
    res.json(floorPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.patch('/floorplans/:id/rooms/:roomNumber', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findById(req.params.id);
    if (!floorPlan) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }
    const roomIndex = floorPlan.rooms.findIndex(room => room.roomNumber === req.params.roomNumber);
    if (roomIndex === -1) {
      return res.status(404).json({ message: 'Room not found' });
    }
    floorPlan.rooms[roomIndex] = { ...floorPlan.rooms[roomIndex], ...req.body };
    await floorPlan.save();
    res.json(floorPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/add-user', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a user by ID
app.put('/update-user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch('/update-user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/delete-floorplan/:id', async (req, res) => {
  try {
    const deletedFloorPlan = await FloorPlan.findByIdAndDelete(req.params.id);
    if (deletedFloorPlan) {
      res.json({ message: 'Floor plan deleted successfully' });
    } else {
      res.status(404).json({ message: 'Floor plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a user by ID
app.delete('/delete-user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/*", (req, res) => {
  res.send("You are on the wrong route");
});
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
