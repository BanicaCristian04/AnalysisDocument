    const express = require('express');
    const session=require('express-session');
    const cors=require('cors');
    const connectDB=require('./config/db');
    const authRoutes=require('./routes/authRoutes');
    const sessionRoutes=require('./routes/sessionRoutes');
    const diffRoutes=require('./routes/diffRoutes');
    const analysisRoutes=require('./routes/analysisRoutes');
    const MongoStore=require('connect-mongo');
    require('dotenv').config();

    const app = express();
    app.use(express.json());

    app.use(
        cors({
          origin: 'http://localhost:3000', 
          credentials: true,
        })
      );
    app.use(
        session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 3600000 
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 3600000,
        }),
        })
    );
    

    app.use("/auth", authRoutes);
    app.use("/session",sessionRoutes);
    app.use("/diff",diffRoutes);
    app.use("/analysis",analysisRoutes);
      
    const PORT = process.env.PORT || 5000;
    connectDB();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    