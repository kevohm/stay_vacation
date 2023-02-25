const Event = require("../models/Event")
const User = require("../models/User");
const Payments = require("../models/Payments");
const Report = require("../models/Report")
const {StatusCodes} = require("http-status-codes")
const getStats = async (req,res) => {
  const events = await Event.find({}).count()
  const success = await Report.findOne({ state: "Success" }).count();
  const fail = await Report.findOne({ state: "Fail" }).count();
    const payments = await Payments.find({}).count();
    const users = await User.find({}).count();
    res.status(StatusCodes.CREATED).json({events:{total:events, success, fail}, payments, users})
}
const timing = {
  day: {
    day: { $dayOfWeek: { date: "$createdAt" } },
  },
  month: {
    month: "$date.month",
  },
  week: {
    week: { $floor: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] } },
  },
};
const getFull = async (req, res) => {
    const time = req.query.time || "day"
    const { type } = req.params
    const time_changer = (time)=> {
    if (time === "day") {
        return timing.day
    } else if (time === "week") {
      return timing.week
    } else {
      return timing.month
    }
    }
    const data = [
      {
        $addFields: {
          date: {
            $dateToParts: {
              date: "$createdAt",
            },
          },
        },
      },
      {
        $group: {
          _id: time_changer(time),
          count: { $sum: 1 },
        },
      },
    ];
    let ans = {}
    if (type === "events") {
        const events = await Event.aggregate(data);
        ans = {events}
    } else if (type === "payments") {
        const payments = await Payments.aggregate(data);
        ans = { payments};
    } else if (type === "reports") {
      const reports = await Report.aggregate(data);
      ans = { reports };
    } else {
        const users = await User.aggregate(data);
        ans = {users};
    }
  res.status(StatusCodes.CREATED).json({ ...ans });
};

module.exports = { getStats, getFull };