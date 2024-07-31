type Session = {
    deviceId: string;
    userId: string;
    logged_in: Date;
    logged_out: Date | null;
    lastOpenedAt: Date;
  };
  
  type UserStats = {
    month: string;
    loggedInUsers: Set<string>;
    activeUsers: Set<string>;
  };

  const sessions: Session[] = [
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
]


function getMonthlyUserStats(sessions: Session[]): UserStats[] {
    const userStats: { [month: string]: UserStats } = {};
  
    sessions.forEach(session => {
      const { userId, logged_in, logged_out, lastOpenedAt } = session;
      const startMonth = new Date(logged_in.getFullYear(), logged_in.getMonth(), 1);
      const endMonth = logged_out ? new Date(logged_out.getFullYear(), logged_out.getMonth(), 1) : new Date();
  
      for (let date = new Date(startMonth); date <= endMonth; date.setMonth(date.getMonth() + 1)) {
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
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
  console.log("fkgkjlflg");

  const monthlyStats = getMonthlyUserStats(sessions);
  monthlyStats.forEach(stat => {
    console.log(`Month: ${stat.month}, Logged In Users: ${stat.loggedInUsers.size}, Active Users: ${stat.activeUsers.size}`);
  });
