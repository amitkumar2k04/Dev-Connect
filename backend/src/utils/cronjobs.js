const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

// scheduling CRON - running at 20:00 pm everyday
cron.schedule("00 20 * * *", async () => {
  // send emails to all people who got requests the previous day
  try {
    // calculating yesterday date from now date
    const yesterday = subDays(new Date(), 1);
    // calculating start & end timestamps
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    // Making DB call - to fetch all the connections requests
    const pendingRequests = await connectionRequestModel
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");

    const listsOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];
    // console.log(listsOfEmails);

    for (const email of listsOfEmails) {
      // send emails
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are too many friend requests are pending, please login to the devconnect.solutions and accept or reject the requests."
        );
        //console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
