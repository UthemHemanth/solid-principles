// ---------------------- SRP: Single Responsibility Principle ----------------------
// User only stores data
class User {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

// ---------------------- ISP: Interface Segregation Principle ----------------------
// Separate interfaces for notifications
class Notifiable {
  send(user, message) {}
}

// ---------------------- OCP: Open/Closed Principle ----------------------
// Add new notifications without changing existing code
class EmailNotification extends Notifiable {
  send(user, message) {
    console.log(`Email sent to ${user.email}: ${message}`);
  }
}

class SMSNotification extends Notifiable {
  send(user, message) {
    console.log(`SMS sent to ${user.phone}: ${message}`);  //loads result first
  }
}

// ---------------------- DIP: Dependency Inversion Principle ----------------------
// High-level service depends on abstraction, not concrete classes
class UserService {
  constructor(notificationService) { // injected dependency
    this.notificationService = notificationService;
  }

  notify(user, message) {
    this.notificationService.send(user, message);
  }
}

// ---------------------- LSP: Liskov Substitution Principle ----------------------
// Any Notifiable subclass can replace another without breaking the system
const user = new User("Hem", "hem@example.com", "1234567890");

// Inject EmailNotification
const emailService = new UserService(new EmailNotification());
emailService.notify(user, "Welcome via Email!");

// Inject SMSNotification
const smsService = new UserService(new SMSNotification());
smsService.notify(user, "Welcome via SMS!");

// ✅ Adding a new type is easy without changing existing code (OCP)
class PushNotification extends Notifiable {
  send(user, message) {
    console.log(`Push notification sent to ${user.name}: ${message}`);
  }
}

const pushService = new UserService(new PushNotification());
pushService.notify(user, "Welcome via Push Notification!");


