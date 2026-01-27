import { Court } from "@/src/domain/court";
import { TimeslotAvailability } from "../domain/timeslot";

export const dummyDates = [
  { date: "2026-01-11", label: "Sun", disabled: true },
  { date: "2026-01-12", label: "Today", active: true },
  { date: "2026-01-13", label: "Tue" },
  { date: "2026-01-14", label: "Wed" },
  { date: "2026-01-15", label: "Thu" },
];

export const dummyTimeslots: TimeslotAvailability[] = [
  { start_time: "07:00", end_time: "08:00", available: true },
  { start_time: "08:00", end_time: "09:00", available: true },
  { start_time: "09:00", end_time: "10:00", available: false },
  { start_time: "10:00", end_time: "11:00", available: true },
];

export const dummyCourts: Court[] = [
  { id: "A", name: "Court A", is_active: true, created_at: "" },
  { id: "B", name: "Court B", is_active: true, created_at: "" },
  { id: "C", name: "Court C", is_active: false, created_at: "" },
];
