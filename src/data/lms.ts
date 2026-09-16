export const students = [
  { name: "Ayesha Khan", roll: "487901", email: "ayesha.khan@example.com", status: "ENROLLED" },
  { name: "Bilal Ahmed", roll: "487902", email: "bilal.ahmed@example.com", status: "ENROLLED" },
  { name: "Fatima Noor", roll: "487903", email: "fatima.noor@example.com", status: "ENROLLED" },
  { name: "Hamza Ali", roll: "487904", email: "hamza.ali@example.com", status: "ENROLLED" },
  { name: "Iqra Saleem", roll: "487905", email: "iqra.saleem@example.com", status: "ENROLLED" },
  { name: "Junaid Raza", roll: "487906", email: "junaid.raza@example.com", status: "ENROLLED" },
  { name: "Kashif Mehmood", roll: "487907", email: "kashif.m@example.com", status: "ENROLLED" },
  { name: "Laiba Tariq", roll: "487908", email: "laiba.tariq@example.com", status: "ENROLLED" },
  { name: "Mohsin Iqbal", roll: "487909", email: "mohsin.iqbal@example.com", status: "ENROLLED" },
  { name: "Abdul Wadood", roll: "487964", email: "abdul.wadood@example.com", status: "ENROLLED" },
];

export type AttendanceStatus = "NOT MARKED" | "PRESENT" | "ABSENT" | "LEAVE";

export const attendance: { roll: string; name: string; status: AttendanceStatus }[] = students.map(
  (s) => ({
    roll: s.roll,
    name: s.name,
    status: "NOT MARKED",
  }),
);

export const assignments = [
  {
    title: "Admin panel (E co...",
    description: "Create the provided UI design in React or nextjs...",
    topics: ["NextJS", "ReactJS Introducti..."],
    extra: 5,
    due: "Sep 10, 2026",
    hackathon: false,
  },
  {
    title: "QUICKSERVE WMA (B...",
    description: "Challenge: Build a modern service-booking web application that...",
    topics: [],
    extra: 0,
    due: "Aug 30, 2026",
    hackathon: true,
  },
  {
    title: "E-Commerce Websi...",
    description: "React.js frontend Create all required e-commerce...",
    topics: ["ReactJS Introducti...", "Components , Props..."],
    extra: 2,
    due: "Aug 17, 2026",
    hackathon: false,
  },
  {
    title: "Furniture E-Comme...",
    description: "Follow the Figma design. ( https://www.figma.com/design/X...",
    topics: ["JavaScript Book Co...", "Github"],
    extra: 3,
    due: "Aug 10, 2026",
    hackathon: false,
  },
  {
    title: "MaintainIQ (Batch-2...",
    description: "MaintainIQ ...",
    topics: [],
    extra: 0,
    due: "Jul 12, 2026",
    hackathon: true,
  },
  {
    title: "JavaScript Assignm...",
    description: "Complete all 25 JavaScript questions available at the link...",
    topics: ["JavaScript Introdu...", "JavaScript Chapter..."],
    extra: 6,
    due: "Jul 10, 2026",
    hackathon: false,
  },
  {
    title: "Budgetting App",
    description: "Develop a fully responsive and functional Budgeting Web...",
    topics: ["JavaScript Chapter...", "JavaScript Chapter..."],
    extra: 10,
    due: "Jun 1, 2026",
    hackathon: false,
  },
  {
    title: "Amazon Clone",
    description: "Create a fully responsive landing page inspired by the official...",
    topics: ["HTML Text", "HTML Images"],
    extra: 13,
    due: "May 24, 2026",
    hackathon: false,
  },
  {
    title: "NASA Landing Page",
    description: "Create a fully responsive landing page inspired by the official NASA...",
    topics: ["Media queries", "HTML Text"],
    extra: 7,
    due: "May 1, 2026",
    hackathon: false,
  },
  {
    title: "Helplytics AI – Com...",
    description: "SMIT GRAND CODING NIGHT - April 2026...",
    topics: [],
    extra: 0,
    due: "Apr 19, 2026",
    hackathon: true,
  },
];

export const quizzes = [
  {
    quiz: "Javascript (Quiz-4)",
    courses: "Modern Web Application Development, Web and Mobile App Development",
    date: "Jun 24, 2026",
    expiry: "Jun 24, 2026",
  },
  {
    quiz: "Javascript (Quiz-3)",
    courses: "Modern Web Application Development, Web and Mobile App Development",
    date: "Jun 3, 2026",
    expiry: "Jun 3, 2026",
  },
  {
    quiz: "Javascript (Quiz-2)",
    courses: "Modern Web Application Development, Web and Mobile App Development",
    date: "May 18, 2026",
    expiry: "May 18, 2026",
  },
  {
    quiz: "Javascript (Quiz-1)",
    courses:
      "Modern Web Application Development, Web and Mobile App Development, JavaScript Crash Course, Full Stack Foundations for Teens",
    date: "Apr 17, 2026",
    expiry: "Apr 17, 2026",
  },
  {
    quiz: "CSS Quiz",
    courses:
      "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development",
    date: "Mar 27, 2026",
    expiry: "Mar 27, 2026",
  },
  {
    quiz: "HTML Quiz",
    courses:
      "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)",
    date: "Jan 7, 2026",
    expiry: "Jan 7, 2026",
  },
  {
    quiz: "HTML Quiz",
    courses:
      "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)",
    date: "Jan 5, 2026",
    expiry: "Jan 5, 2026",
  },
];

export const progressModules = [
  { title: "Web Designing", done: 20, total: 20 },
  { title: "Front-End Development", done: 26, total: 31 },
  { title: "Modern Front-End Development", done: 10, total: 14 },
  { title: "Back-End Development", done: 0, total: 16 },
];
