import inquirer from 'inquirer';

interface Student {
  name: string;
  id: number;
  courses: Course[];
  balance: number;
}

interface Course {
  name: string;
  cost: number;
}

class Student {
  name: string;
  id: number;
  courses: Course[];
  balance: number;
  constructor(name: string) {
    this.name = name;
    this.courses = [];
    this.balance = 0;
    this.id = Math.floor(Math.random() * 1000);
  }
  enroll(course: Course): void {
    this.courses.push(course);
    this.balance += course.cost;
  }
  payTuition(amount: number): void {
    if (amount > this.balance) {
      console.error("Insufficient funds.");
    } else {
      this.balance -= amount;
      console.log(`Paid ${amount}. Remaining balance: ${this.balance}`);
    }
  }
  showStatus(): void {
    console.log(`Student ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log("Enrolled Courses:");
    this.courses.forEach((course) => console.log(`  - ${course.name}`));
    console.log(`Balance: ${this.balance}`);
  }
}

const courses: Course[] = [
  // Define available courses here
  { name: "Math", cost: 100 },
  { name: "Science", cost: 150 },
  // ... add more courses
];

async function main() {
  let student: Student[] = []

  while (true) {
    const options = [
      { name: "Add New Student", value: "addStudent" },
      { name: "View Student Status", value: "viewStatus" },
      { name: "Enroll in Course", value: "enroll" },
      { name: "Pay Tuition", value: "payTuition" },
      { type: 'separator' },
      { name: "Exit", value: "exit" },
    ];

    const { action } = await inquirer.prompt([{ type: 'list', name: 'action', message: 'Select an action:', choices: options }]);

    switch (action) {
      case "addStudent":
        const { name } = await inquirer.prompt([{ type: 'input', name: 'name', message: 'Enter student name:' }]);
        const newStudent = new Student(name)
        student.push(newStudent);
        console.log(`Student added successfully. ID: ${newStudent?.id}`);
        break;
      case "viewStatus":
        if (!student) {
          console.error("No student selected. Please add a student first.");
        } else {
          // student.showStatus();
        }
        break;
      case "enroll":
        if (!student) {
          console.error("No student selected. Please add a student first.");
        } else {
          const { courseName } = await inquirer.prompt([{ type: 'list', name: 'courseName', message: 'Select a course to enroll:', choices: courses.map((course) => course.name) }]);
          const selectedCourse = courses.find((course) => course.name === courseName);
          if (selectedCourse) {
            // student.enroll(selectedCourse);
            console.log(`Enrolled in ${courseName} successfully.`);
          } else {
            console.error("Invalid course selection.");
          }
        }
        break;
      case "payTuition":
        if (!student) {
          console.error("No student selected. Please add a student first.");
        } else {
          const seletedStudent = await inquirer.prompt([{ type: 'list', name: 'student', message: 'Select a student:', choices: student.map((student, index) => `${index + 1}. ${student.id}, ${student.name}`) }]);
          const selectedStudent = student[seletedStudent.student.split(".")[1]];
          const { amount } = await inquirer.prompt([{ type: 'number', name: 'amount', message: 'Enter amount to pay:', validate: (input) => (isNaN(input) ? 'Please enter a valid number.' : true) }]);
          if (!selectedStudent) {
            console.error("Invalid student selection.");
          }

          // Perform payment
          selectedStudent.payTuition(amount);
          console.log(`${selectedStudent.id} has Paid ${amount}. Remaining balance: ${selectedStudent.balance}`);
        }
        break;
      case "exit":
        console.log("Exiting program.");
        return;
    }
  }
}

main()