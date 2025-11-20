# 🌱 KidInvest - Investment Education App for Children

A Progressive Web App (PWA) that teaches school-age children (7-12 years) about compound interest and investing through daily visualization of their growing savings.

## 📋 Overview

KidInvest helps parents introduce financial literacy concepts to their children by showing how investments grow over time. Built with simplicity and educational value in mind, the app displays daily, weekly, and monthly gains to make compound interest tangible and exciting for young minds.

**Inspired by:** [D-iNvestments by Roberdam](https://roberdam.com/en/dinversiones.html)

## ✨ Features

### Phase 1 (MVP - Current)
- **Simple Configuration**: Enter child name, initial amount, interest rate, and start date
- **Real-time Dashboard**: View current balance, daily/weekly/monthly gains
- **Offline-First**: Works without internet connection using localStorage
- **PWA Support**: Install on any device like a native app
- **No Backend Required**: All data stored locally on device
- **Privacy-Focused**: No data collection or external sharing

### Phase 2 (Planned)
- **Parent Account System**: Email-based authentication with Firebase
- **Multi-Child Management**: Track multiple children from one account
- **Cross-Device Sync**: Access data from phone, tablet, or computer
- **Interactive Charts**: Visual graphs showing growth over time
- **Goal Setting**: Set savings targets with progress tracking
- **Offline + Online Mode**: Seamless sync when connection available

## 🚀 Getting Started


## 🛠️ Tech Stack

### Phase 1
- **React 18** with Vite
- **localStorage** for data persistence
- **Service Workers** for PWA functionality
- **CSS Modules** for styling

### Phase 2 (Future)
- **Firebase Authentication** for user accounts
- **Cloud Firestore** for cross-device sync
- **Recharts/Chart.js** for data visualization
- **React Router** for multi-page navigation

## 📱 Usage

1. **Setup**: Open the app and enter your child's investment details
   - Child's name
   - Initial investment amount
   - Annual interest rate (e.g., 8-12%)
   - Start date

2. **Dashboard**: View the daily updated metrics
   - Current balance
   - Daily gain
   - Weekly gain
   - Monthly gain
   - Total gain since start

3. **Install**: Tap "Add to Home Screen" to use as a native app

## 🎯 Target Audience

- **Primary**: Parents of school-age children (7-12 years)
- **Secondary**: Educators teaching financial literacy
- **Geography**: Global (multi-currency support planned)

## 📊 Calculations

The app uses the compound interest formula:



Where:
- A = Final amount
- P = Principal (initial investment)
- r = Annual interest rate (decimal)
- n = Number of times interest compounds per year
- t = Time in years

For daily calculations, we use daily compounding (n = 365).

## 🗺️ Roadmap

**Phase 1 (Weeks 1-4)** ✅
- [x] Core UI components
- [x] Configuration screen
- [x] Dashboard with real-time calculations
- [x] PWA setup with offline support
- [x] localStorage implementation

**Phase 2 (Weeks 5-12)** 🚧
- [ ] Firebase integration
- [ ] User authentication
- [ ] Multi-child management
- [ ] Chart visualization
- [ ] Goal setting feature
- [ ] Data migration from Phase 1

**Phase 3 (Future)** 📅
- [ ] Mobile app (React Native)
- [ ] Gamification elements
- [ ] Educational content library
- [ ] Parent-child messaging
- [ ] Multi-currency support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original concept by [Roberdam](https://roberdam.com/en/dinversiones.html)
- Inspired by the need for early financial literacy education
- Built with modern web technologies for accessibility

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/kidinvest](https://github.com/yourusername/kidinvest)

---

**Made with ❤️ for teaching kids about financial responsibility**



