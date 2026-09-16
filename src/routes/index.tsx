import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Columns2,
  Eye,
  FileText,
  LayoutGrid,
  MessageSquareText,
  Pencil,
  Plus,
  Search,
  Users,
  CircleCheck,
  CircleX,
  Clock,
  Timer,
} from "lucide-react";
import { FeedbackDialog } from "@/components/lms/FeedbackDialog";
import { assignments, attendance, progressModules, quizzes, students } from "@/data/lms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modern Web Application Development — Trainer Dashboard" },
      {
        name: "description",
        content:
          "Trainer dashboard for Modern Web Application Development: students, attendance, assignments, quizzes and course progress.",
      },
      { property: "og:title", content: "Modern Web Application Development — Trainer Dashboard" },
      {
        property: "og:description",
        content: "Manage students, attendance, assignments, quizzes and course progress.",
      },
    ],
  }),
  component: TrainerDashboard,
});

const TABS = [
  { id: "students", label: "Students", icon: Users },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "quizzes", label: "Quizzes", icon: ClipboardList },
  { id: "progress", label: "Course Progress", icon: CircleCheck },
] as const;

type TabId = (typeof TABS)[number]["id"];

function TrainerDashboard() {
  const [tab, setTab] = useState<TabId>("students");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-border bg-card py-5 sm:flex">
        <ChevronRight className="size-4 text-muted-foreground" />
        <LayoutGrid className="size-5 text-muted-foreground" />
        <CalendarDays className="size-5 text-muted-foreground" />
        <CalendarCheck className="size-5 text-muted-foreground" />
      </aside>

      <main className="min-w-0 flex-1 px-3 py-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center justify-between gap-3">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <span className="hover:text-foreground">Dashboard</span>
              <ChevronRight className="size-3" />
              <span className="truncate text-foreground">Modern Web Application Development</span>
            </nav>
            <button
              onClick={() => setFeedbackOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:text-sm"
            >
              <MessageSquareText className="size-4" />
              Feedback
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
                Modern Web Application Development
              </h1>
              {tab === "students" && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      placeholder="Search by name, email or roll no..."
                      className="w-full rounded-md border border-border py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary sm:w-64"
                    />
                  </div>
                  <select className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-primary sm:w-32">
                    <option>All</option>
                    <option>Enrolled</option>
                    <option>Dropped</option>
                  </select>
                </div>
              )}
              {tab === "assignments" && (
                <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  <Plus className="size-4" /> New Assignment
                </button>
              )}
            </div>

            <div className="overflow-x-auto border-b border-border px-2">
              <div className="flex min-w-max gap-1">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors ${
                      tab === id
                        ? "border-primary font-medium text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2 sm:p-4">
              {tab === "students" && <StudentsTab />}
              {tab === "attendance" && <AttendanceTab />}
              {tab === "assignments" && <AssignmentsTab />}
              {tab === "quizzes" && <QuizzesTab />}
              {tab === "progress" && <ProgressTab />}
            </div>
          </div>
        </div>
      </main>

      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}

function Pagination({ info, pages }: { info: string; pages: number }) {
  const [page, setPage] = useState(1);
  const shown = pages <= 3 ? Array.from({ length: pages }, (_, i) => i + 1) : [1, 2, "...", pages];
  return (
    <div className="flex flex-col items-center gap-3 border-t border-border px-3 py-3 text-sm text-muted-foreground sm:flex-row sm:justify-between">
      <span>{info}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
        >
          <ChevronLeft className="size-4" /> Previous
        </button>
        {shown.map((p, i) =>
          typeof p === "number" ? (
            <button
              key={i}
              onClick={() => setPage(p)}
              className={`size-7 rounded-md border text-xs ${
                page === p
                  ? "border-border bg-muted font-medium text-foreground"
                  : "border-transparent hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={i} className="px-1">
              {p}
            </span>
          ),
        )}
        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
        >
          Next <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function StudentsTab() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-3 py-3 font-normal">Name</th>
              <th className="px-3 py-3 font-normal">Roll Number</th>
              <th className="px-3 py-3 font-normal">Email</th>
              <th className="px-3 py-3 font-normal">Status</th>
              <th className="px-3 py-3 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.roll} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {s.name.charAt(0)}
                    </span>
                    <span className="text-foreground">{s.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{s.roll}</td>
                <td className="px-3 py-3 text-muted-foreground">{s.email}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground">
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <Eye className="size-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination info="Showing 1-10 of 201 records" pages={21} />
    </div>
  );
}

function AttendanceTab() {
  const [date, setDate] = useState("2026-09-15");
  const [rows, setRows] = useState(attendance);

  const counts = useMemo(
    () => ({
      present: rows.filter((r) => r.status === "PRESENT").length,
      absent: rows.filter((r) => r.status === "ABSENT").length,
      leave: rows.filter((r) => r.status === "LEAVE").length,
    }),
    [rows],
  );

  const mark = (roll: string, status: string) =>
    setRows((rs) => rs.map((r) => (r.roll === roll ? { ...r, status: status as never } : r)));

  const stats = [
    { label: "Total Students", value: 57, icon: Clock, tone: "text-primary" },
    { label: "Present", value: counts.present, icon: CircleCheck, tone: "text-emerald-600" },
    { label: "Absent", value: counts.absent, icon: CircleX, tone: "text-destructive" },
    { label: "Leave", value: counts.leave, icon: Timer, tone: "text-amber-500" },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col items-end gap-1 px-1">
        <span className="text-sm font-medium text-foreground">Select a Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div>
              <p className="text-xl font-semibold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
            <Icon className={`size-6 ${tone}`} />
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-3 py-3 font-normal">Roll #</th>
              <th className="px-3 py-3 font-normal">Full Name</th>
              <th className="px-3 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.roll} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-3 py-3 text-muted-foreground">{r.roll}</td>
                <td className="px-3 py-3 text-foreground">{r.name}</td>
                <td className="px-3 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => mark(r.roll, e.target.value)}
                    className="rounded-md border border-border px-2 py-1 text-[11px] tracking-wide text-muted-foreground outline-none focus:border-primary"
                  >
                    <option>NOT MARKED</option>
                    <option>PRESENT</option>
                    <option>ABSENT</option>
                    <option>LEAVE</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination info="Showing 1-10 of 57 students" pages={6} />
    </div>
  );
}

function AssignmentsTab() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-3 py-3 font-normal">Title</th>
              <th className="px-3 py-3 font-normal">Description</th>
              <th className="px-3 py-3 font-normal">Topics</th>
              <th className="px-3 py-3 font-normal">Due Date</th>
              <th className="px-3 py-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr
                key={a.title}
                className={`border-b border-border last:border-0 ${a.hackathon ? "bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <td className="px-3 py-3">
                  <p className={a.hackathon ? "text-primary" : "text-foreground"}>{a.title}</p>
                  {a.hackathon && (
                    <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      HACKATHON
                    </span>
                  )}
                </td>
                <td className="max-w-[260px] px-3 py-3 text-muted-foreground">{a.description}</td>
                <td className="px-3 py-3">
                  {a.topics.length === 0 ? (
                    <span className="text-muted-foreground">No topics</span>
                  ) : (
                    <div className="flex max-w-[200px] flex-wrap gap-1">
                      {a.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                      {a.extra > 0 && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          +{a.extra}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td
                  className={`whitespace-nowrap px-3 py-3 ${a.hackathon ? "text-primary" : "text-muted-foreground"}`}
                >
                  {a.due}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-3 text-muted-foreground">
                    <Eye className="size-4" />
                    <Pencil className="size-4" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination info="Showing 1-10 of 13 records" pages={2} />
    </div>
  );
}

function QuizzesTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="px-3 py-3 font-normal">Quiz</th>
            <th className="px-3 py-3 font-normal">Course(s)</th>
            <th className="px-3 py-3 font-normal">Date</th>
            <th className="px-3 py-3 font-normal">Expiry</th>
            <th className="px-3 py-3 font-normal">Status</th>
            <th className="px-3 py-3 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="px-3 py-3 text-foreground">{q.quiz}</td>
              <td className="max-w-[280px] px-3 py-3 text-muted-foreground">{q.courses}</td>
              <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">{q.date}</td>
              <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">{q.expiry}</td>
              <td className="px-3 py-3">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-600">
                  ACTIVE
                </span>
              </td>
              <td className="px-3 py-3">
                <div className="flex gap-3 text-muted-foreground">
                  <Eye className="size-4 text-emerald-600" />
                  <ClipboardList className="size-4" />
                  <Eye className="size-4" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgressTab() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-4">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Compare Progress</p>
        <h2 className="mt-1 text-base font-semibold text-foreground">Course Progress Overview</h2>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 text-sm text-foreground transition-colors hover:bg-muted">
          <Columns2 className="size-4" /> Only My Progress
        </button>
      </div>

      <div className="rounded-lg border border-border p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">My Progress</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Topics: 56/81
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            S Muzammil Javed – Zaitoon Ashraf IT Park
          </h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            Batch 20
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Mon 01:00 PM – 03:00 PM | Wed 01:00 PM – 03:00 PM | Fri 01:00 PM – 03:00 PM
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall progress</span>
          <span className="font-medium text-primary">69%</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary" style={{ width: "69%" }} />
        </div>

        <div className="mt-4 space-y-3">
          {progressModules.map((m) => {
            const pct = Math.round((m.done / m.total) * 100);
            const isOpen = open === m.title;
            return (
              <div key={m.title} className="rounded-lg border border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : m.title)}
                  className="flex w-full items-center gap-3 p-3 text-left"
                >
                  {pct === 100 ? (
                    <CircleCheck className="size-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Clock className="size-5 shrink-0 text-amber-500" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {m.title}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Topics: {m.done}/{m.total}
                    </span>
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 text-[10px] font-medium text-primary">
                    {pct}%
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                    {m.done} of {m.total} topics completed in this module.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
