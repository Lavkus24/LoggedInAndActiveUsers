var sessions = [
    {
        deviceId: 'device1',
        userId: 'user1',
        logged_in: new Date('2024-01-01T08:00:00Z'),
        logged_out: new Date('2024-01-31T18:00:00Z'),
        lastOpenedAt: new Date('2024-01-15T12:00:00Z')
    },
    {
        deviceId: 'device2',
        userId: 'user1',
        logged_in: new Date('2024-02-01T08:00:00Z'),
        logged_out: new Date('2024-02-28T18:00:00Z'),
        lastOpenedAt: new Date('2024-02-20T12:00:00Z')
    },
    {
        deviceId: 'device3',
        userId: 'user2',
        logged_in: new Date('2024-01-10T08:00:00Z'),
        logged_out: null,
        lastOpenedAt: new Date('2024-01-20T12:00:00Z')
    },
    {
        deviceId: 'device4',
        userId: 'user3',
        logged_in: new Date('2024-03-01T08:00:00Z'),
        logged_out: new Date('2024-03-31T18:00:00Z'),
        lastOpenedAt: new Date('2024-03-10T12:00:00Z')
    },
];
function getMonthlyUserStats(sessions) {
    var userStats = {};
    sessions.forEach(function (session) {
        var userId = session.userId, logged_in = session.logged_in, logged_out = session.logged_out, lastOpenedAt = session.lastOpenedAt;
        var startMonth = new Date(logged_in.getFullYear(), logged_in.getMonth(), 1);
        var endMonth = logged_out ? new Date(logged_out.getFullYear(), logged_out.getMonth(), 1) : new Date();
        for (var date = new Date(startMonth); date <= endMonth; date.setMonth(date.getMonth() + 1)) {
            var monthKey = "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1);
            if (!userStats[monthKey]) {
                userStats[monthKey] = { month: monthKey, loggedInUsers: new Set(), activeUsers: new Set() };
            }
            userStats[monthKey].loggedInUsers.add(userId);
            if (lastOpenedAt >= new Date(date.getFullYear(), date.getMonth(), 1) &&
                lastOpenedAt < new Date(date.getFullYear(), date.getMonth() + 1, 1)) {
                userStats[monthKey].activeUsers.add(userId);
            }
        }
    });
    return Object.values(userStats);
}

var monthlyStats = getMonthlyUserStats(sessions);
monthlyStats.forEach(function (stat) {
    console.log("Month: ".concat(stat.month, ", Logged In Users: ").concat(stat.loggedInUsers.size, ", Active Users: ").concat(stat.activeUsers.size));
});
