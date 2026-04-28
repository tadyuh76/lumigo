export const USER = {
  name: "An Nguyen",
  initials: "AN",
  examInDays: 24,
  targetScore: 1500,
  currentScore: 1340,
  streak: 12,
};

export const SCORE_HISTORY = [
  { label: "W1", math: 620, verbal: 600 },
  { label: "W2", math: 640, verbal: 610 },
  { label: "W3", math: 650, verbal: 630 },
  { label: "W4", math: 670, verbal: 640 },
  { label: "W5", math: 680, verbal: 650 },
  { label: "W6", math: 700, verbal: 660 },
  { label: "W7", math: 710, verbal: 660 },
  { label: "W8", math: 720, verbal: 670 },
];

export const SKILL_BREAKDOWN = [
  { name: "Algebra", mastery: 86 },
  { name: "Advanced Math", mastery: 71 },
  { name: "Geometry & Trig", mastery: 64 },
  { name: "Data Analysis", mastery: 78 },
  { name: "Reading: Craft", mastery: 82 },
  { name: "Reading: Information", mastery: 69 },
  { name: "Writing: Expression", mastery: 74 },
  { name: "Writing: Standard English", mastery: 88 },
];

export const PRACTICE_TESTS = [
  {
    id: "p1",
    title: "Full-Length Practice Test 04",
    section: "Full Test",
    questions: 98,
    duration: "2h 14m",
    status: "Recommended",
    accent: "brand",
  },
  {
    id: "p2",
    title: "Math Module B — Advanced",
    section: "Math",
    questions: 22,
    duration: "35m",
    status: "In Progress",
    accent: "warning",
  },
  {
    id: "p3",
    title: "Reading & Writing — Section 1",
    section: "Verbal",
    questions: 27,
    duration: "32m",
    status: "New",
    accent: "success",
  },
  {
    id: "p4",
    title: "Geometry Drill: Triangles",
    section: "Math",
    questions: 15,
    duration: "20m",
    status: "Review",
    accent: "muted",
  },
  {
    id: "p5",
    title: "Vocabulary in Context — Hard",
    section: "Verbal",
    questions: 18,
    duration: "22m",
    status: "New",
    accent: "success",
  },
  {
    id: "p6",
    title: "Full-Length Practice Test 03",
    section: "Full Test",
    questions: 98,
    duration: "2h 14m",
    status: "Completed",
    accent: "muted",
  },
];

export const STUDY_PLAN = [
  {
    day: "Mon",
    date: "Apr 28",
    focus: "Algebra: Linear Systems",
    minutes: 45,
    tasks: [
      { title: "Warm-up: 10 mixed problems", done: true },
      { title: "Concept review: substitution vs elimination", done: true },
      { title: "Timed set: 15 questions", done: false },
    ],
  },
  {
    day: "Tue",
    date: "Apr 29",
    focus: "Reading: Inference questions",
    minutes: 40,
    tasks: [
      { title: "Read 2 dual passages", done: false },
      { title: "Drill: 12 inference items", done: false },
    ],
  },
  {
    day: "Wed",
    date: "Apr 30",
    focus: "Geometry: Triangles & Angles",
    minutes: 50,
    tasks: [
      { title: "Theorem refresher", done: false },
      { title: "Practice set + error log review", done: false },
    ],
  },
  {
    day: "Thu",
    date: "May 1",
    focus: "Writing: Punctuation",
    minutes: 35,
    tasks: [
      { title: "Comma & semicolon rules", done: false },
      { title: "20-question quiz", done: false },
    ],
  },
  {
    day: "Fri",
    date: "May 2",
    focus: "Math Module B Mock",
    minutes: 60,
    tasks: [
      { title: "Take timed module", done: false },
      { title: "Review missed problems", done: false },
    ],
  },
  {
    day: "Sat",
    date: "May 3",
    focus: "Full-length practice test",
    minutes: 180,
    tasks: [{ title: "Full-Length Practice Test 04", done: false }],
  },
  {
    day: "Sun",
    date: "May 4",
    focus: "Rest + light vocab",
    minutes: 20,
    tasks: [{ title: "Vocab flashcards (Quizlet)", done: false }],
  },
];

export const TUTOR_MESSAGES = [
  {
    role: "tutor",
    text: "Good morning, An! I noticed you've been losing points on geometry — especially angle relationships. I've added a focused 50-min block on Wednesday. Want me to also queue a triangles drill for tonight?",
  },
  {
    role: "user",
    text: "Yes please. Also, can we squeeze in more reading inference practice?",
  },
  {
    role: "tutor",
    text: "Done. Tuesday's block is now reading inference + a 12-question drill. You're 1 hour ahead of your weekly goal — keep it up.",
  },
];

export const ERROR_LOG = [
  {
    id: "e1",
    date: "Apr 27",
    section: "Math",
    topic: "Angles",
    difficulty: "Easy",
    question:
      "In $\\triangle JKL$, the measures of $\\angle J$ and $\\angle K$ are equal and the measure of $\\angle L$ is $136°$. What is the measure of $\\angle J$?",
    yourAnswer: "68°",
    correctAnswer: "22°",
    explanation:
      "The angles sum to $180°$. Since $\\angle J = \\angle K$, $2\\angle J + 136 = 180$, so $\\angle J = 22°$.",
  },
  {
    id: "e2",
    date: "Apr 26",
    section: "Verbal",
    topic: "Inference",
    difficulty: "Hard",
    question:
      "Which choice most logically completes the text about coral reef bleaching?",
    yourAnswer: "B — increased nutrient runoff",
    correctAnswer: "D — sustained thermal stress",
    explanation:
      "The passage emphasizes prolonged temperature anomalies as the primary driver, not nutrient changes.",
  },
  {
    id: "e3",
    date: "Apr 25",
    section: "Math",
    topic: "Quadratics",
    difficulty: "Medium",
    question: "If $x^2 - 6x + 5 = 0$, what is the sum of the solutions?",
    yourAnswer: "−6",
    correctAnswer: "6",
    explanation:
      "By Vieta's formulas, the sum of the roots equals $-\\dfrac{b}{a} = -\\dfrac{-6}{1} = 6$.",
  },
  {
    id: "e4",
    date: "Apr 24",
    section: "Verbal",
    topic: "Punctuation",
    difficulty: "Medium",
    question: "Which choice best uses punctuation conventionally?",
    yourAnswer: "A — comma splice",
    correctAnswer: "C — semicolon between independent clauses",
    explanation:
      "Two independent clauses joined without a conjunction require a semicolon.",
  },
  {
    id: "e5",
    date: "Apr 23",
    section: "Math",
    topic: "Linear Functions",
    difficulty: "Easy",
    question: "The line passes through $(2, 5)$ and $(4, 11)$. What is its slope?",
    yourAnswer: "2",
    correctAnswer: "3",
    explanation: "$$\\text{slope} = \\dfrac{11 - 5}{4 - 2} = \\dfrac{6}{2} = 3.$$",
  },
];

export const QUESTIONS: Record<
  string,
  { prompt: string; choices: string[]; correct: number; explanation: string; topic: string }[]
> = {
  p1: [
    {
      topic: "Heart of Algebra",
      prompt:
        "A music streaming service charges a monthly fee of \\$9.99 plus \\$0.05 for each song downloaded. Which equation models the total monthly cost $C$, in dollars, when $n$ songs are downloaded?",
      choices: ["$C = 9.99n + 0.05$", "$C = 0.05n + 9.99$", "$C = (9.99 + 0.05)n$", "$C = 9.99 + 0.05/n$"],
      correct: 1,
      explanation:
        "The flat fee \\$9.99 is constant. Each downloaded song adds \\$0.05, so the variable cost is $0.05n$. Total: $$C = 0.05n + 9.99.$$",
    },
    {
      topic: "Reading: Words in Context",
      prompt:
        "*Despite the apparent simplicity of his prose, Hemingway's writing is anything but ______; every word is chosen with care.*\n\nWhich choice most logically completes the text?",
      choices: ["careless", "ornate", "deliberate", "verbose"],
      correct: 0,
      explanation:
        "The contrast word **anything but** signals the opposite of *chosen with care*. The opposite of careful is **careless**.",
    },
    {
      topic: "Advanced Math",
      prompt:
        "If $x^2 - 6x + 9 = 25$, what is the sum of the possible values of $x$?",
      choices: ["$-2$", "$3$", "$6$", "$8$"],
      correct: 2,
      explanation:
        "$(x-3)^2 = 25 \\Rightarrow x-3 = \\pm 5$, so $x = 8$ or $x = -2$. The sum is $8 + (-2) = 6$.",
    },
    {
      topic: "Geometry & Trig",
      prompt:
        "In $\\triangle ABC$, $\\angle B = 90°$, $AB = 6$, and $BC = 8$. What is $\\sin(A)$?",
      choices: ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$"],
      correct: 1,
      explanation:
        "By Pythagoras, $AC = \\sqrt{6^2 + 8^2} = 10$. $\\sin(A) = \\dfrac{\\text{opposite}}{\\text{hypotenuse}} = \\dfrac{BC}{AC} = \\dfrac{8}{10} = \\dfrac{4}{5}.$",
    },
    {
      topic: "Data Analysis",
      prompt:
        "A sample of 200 students has a mean SAT score of 1180 with a margin of error of $\\pm 30$ at the 95% confidence level. Which conclusion is most appropriate?",
      choices: [
        "Every student in the population scored between 1150 and 1210.",
        "We are 95% confident the population mean lies between 1150 and 1210.",
        "95% of students scored within 30 points of 1180.",
        "The true mean is exactly 1180.",
      ],
      correct: 1,
      explanation:
        "A confidence interval describes the **population mean**, not individual scores. The correct interpretation is that we are 95% confident the population mean lies in $[1150, 1210]$.",
    },
  ],
  p2: [
    {
      topic: "Quadratics",
      prompt: "What are the solutions to $2x^2 + 5x - 3 = 0$?",
      choices: [
        "$x = -3,\\ \\tfrac{1}{2}$",
        "$x = 3,\\ -\\tfrac{1}{2}$",
        "$x = -\\tfrac{1}{2},\\ -3$",
        "$x = \\tfrac{1}{2},\\ 3$",
      ],
      correct: 0,
      explanation:
        "Factor: $(2x - 1)(x + 3) = 0$, giving $x = \\tfrac{1}{2}$ or $x = -3$.",
    },
    {
      topic: "Functions",
      prompt:
        "The function $f$ is defined by $f(x) = 3x^2 - 2x + 1$. What is the value of $f(-2)$?",
      choices: ["$9$", "$13$", "$17$", "$21$"],
      correct: 2,
      explanation:
        "$f(-2) = 3(-2)^2 - 2(-2) + 1 = 3(4) + 4 + 1 = 12 + 4 + 1 = 17.$",
    },
    {
      topic: "Exponents",
      prompt: "If $\\dfrac{x^7 \\cdot x^{-3}}{x^2} = x^k$, what is the value of $k$?",
      choices: ["$1$", "$2$", "$5$", "$8$"],
      correct: 1,
      explanation:
        "Combine exponents: $\\dfrac{x^{7-3}}{x^2} = x^{4-2} = x^2$, so $k = 2$.",
    },
  ],
  p3: [
    {
      topic: "Standard English",
      prompt:
        "*The biologist, along with her three assistants, ______ planning to publish the results next spring.*\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
      choices: ["are", "is", "were", "have been"],
      correct: 1,
      explanation:
        "The subject is **the biologist** (singular). The phrase *along with her three assistants* is a parenthetical and does not change subject number, so the verb must be **is**.",
    },
    {
      topic: "Punctuation",
      prompt:
        "*The exhibit features three twentieth-century artists ______ Frida Kahlo, Diego Rivera, and Rufino Tamayo.*\n\nWhich choice completes the text with the most appropriate punctuation?",
      choices: [", namely;", ": namely,", "—namely:", ", namely,"],
      correct: 3,
      explanation:
        "*Namely* introduces a list within a sentence. A pair of commas around it correctly sets off the parenthetical introduction.",
    },
    {
      topic: "Inference",
      prompt:
        "*Although early reviews of the novel were lukewarm, by the end of the decade it had become a touchstone of contemporary fiction, cited by both critics and novelists as a quiet revolution in form.*\n\nWhich choice best states the main idea of the text?",
      choices: [
        "The novel was poorly written despite later acclaim.",
        "Initially modest reception did not prevent the novel from becoming highly influential.",
        "Critics and novelists rarely agree on what counts as innovative.",
        "Lukewarm reviews are usually a predictor of long-term success.",
      ],
      correct: 1,
      explanation:
        "The text contrasts *lukewarm* early reviews with the novel's later status as influential. Choice B captures both halves of that contrast.",
    },
  ],
  p4: [
    {
      topic: "Triangles",
      prompt:
        "In $\\triangle JKL$, the measures of $\\angle J$ and $\\angle K$ are equal, and the measure of $\\angle L$ is $136°$. What is the measure of $\\angle J$?",
      choices: ["$22°$", "$32°$", "$44°$", "$68°$"],
      correct: 0,
      explanation:
        "The angles of a triangle sum to $180°$. Since $\\angle J = \\angle K$: $$2\\angle J + 136 = 180 \\Rightarrow \\angle J = 22°.$$",
    },
    {
      topic: "Circles",
      prompt:
        "A circle in the $xy$-plane has equation $(x-2)^2 + (y+3)^2 = 49$. What is the length of its radius?",
      choices: ["$3$", "$7$", "$14$", "$49$"],
      correct: 1,
      explanation:
        "The standard form $(x-h)^2 + (y-k)^2 = r^2$ gives $r^2 = 49$, so $r = 7$.",
    },
  ],
  p5: [
    {
      topic: "Vocabulary in Context",
      prompt:
        "*The committee's decision was widely viewed as ______: it pleased neither reformers nor traditionalists.*\n\nWhich choice most logically completes the text?",
      choices: ["a triumph", "a compromise", "an oversight", "a vindication"],
      correct: 1,
      explanation:
        "A decision that satisfies neither side is a classic **compromise**. The other choices either imply success (A, D) or accident (C).",
    },
    {
      topic: "Vocabulary in Context",
      prompt:
        "As used in the text, the word *ephemeral* most nearly means:",
      choices: ["lasting", "fleeting", "ancient", "ornate"],
      correct: 1,
      explanation: "*Ephemeral* means short-lived or transitory — i.e., **fleeting**.",
    },
  ],
  p6: [
    {
      topic: "Linear Functions",
      prompt:
        "The line $\\ell$ in the $xy$-plane passes through $(1, 2)$ and $(4, 11)$. What is the slope of $\\ell$?",
      choices: ["$2$", "$3$", "$\\tfrac{11}{4}$", "$\\tfrac{9}{5}$"],
      correct: 1,
      explanation:
        "Slope $= \\dfrac{11 - 2}{4 - 1} = \\dfrac{9}{3} = 3.$",
    },
    {
      topic: "Systems",
      prompt:
        "If $\\begin{cases} 2x + 3y = 12 \\\\ x - y = 1 \\end{cases}$, what is the value of $x$?",
      choices: ["$1$", "$2$", "$3$", "$4$"],
      correct: 2,
      explanation:
        "From the second equation, $x = y + 1$. Substitute: $2(y+1) + 3y = 12 \\Rightarrow 5y = 10 \\Rightarrow y = 2$, so $x = 3$.",
    },
  ],
};

export const RECENT_ACTIVITY = [
  { label: "Reading & Writing — Section 1", score: "24/27", when: "Today" },
  { label: "Math Module A", score: "20/22", when: "Yesterday" },
  { label: "Vocabulary Drill", score: "16/18", when: "2 days ago" },
  { label: "Full-Length Practice Test 03", score: "1320", when: "5 days ago" },
];
