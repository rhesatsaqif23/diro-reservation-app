"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Court } from "@/src/domain/court";
import { TimeslotAvailability } from "@/src/domain/timeslot";
import { Class } from "@/src/domain/class";

import { SelectDate } from "@/src/components/booking/SelectDate";
import { SelectTimeslot } from "@/src/components/booking/SelectTimeslot";
import { SelectCourt } from "@/src/components/booking/SelectCourt";
import { BookingSummaryCard } from "@/src/components/booking/BookingSummary";

import { ClassService } from "@/src/services/class.service";
import { BookingService } from "@/src/services/booking.service";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [dates, setDates] = useState<string[]>([]);
  const [timeslots, setTimeslots] = useState<TimeslotAvailability[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] =
    useState<TimeslotAvailability | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const [loading, setLoading] = useState(false);

  // fetch class
  useEffect(() => {
    if (!classId) return;

    ClassService.getByID(classId).then(setSelectedClass);
  }, [classId]);

  // fetch available dates
  useEffect(() => {
    if (!classId) return;

    BookingService.getAvailableDates(classId).then((res) => {
      setDates(res.data);
    });
  }, [classId]);

  // fetch timeslots
  useEffect(() => {
    if (!classId || !selectedDate) return;

    const fetchTimeslots = async () => {
      setLoading(true);
      try {
        const res = await BookingService.getAvailableTimeslots(
          classId,
          selectedDate,
        );
        setTimeslots(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeslots();
  }, [classId, selectedDate]);

  // fetch courts
  useEffect(() => {
    if (!classId || !selectedDate || !selectedTimeslot) return;

    const fetchCourts = async () => {
      setLoading(true);
      try {
        const res = await BookingService.getAvailableCourts(
          classId,
          selectedDate,
          selectedTimeslot.start_time,
        );
        setCourts(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [classId, selectedDate, selectedTimeslot]);

  const handleConfirmBooking = () => {
    if (!classId || !selectedDate || !selectedTimeslot || !selectedCourt)
      return;

    console.log("CONFIRM BOOKING", {
      class_id: classId,
      court_id: selectedCourt.id,
      date: selectedDate,
      start_time: selectedTimeslot.start_time,
    });
  };

  const dateOptions = dates.map((date) => ({
    date,
    label: new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
  }));

  return (
    <section className="container-page py-10 space-y-10">
      <SelectDate
        dates={dateOptions}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setSelectedTimeslot(null);
          setSelectedCourt(null);
          setTimeslots([]);
          setCourts([]);
        }}
      />

      <SelectTimeslot
        timeslots={timeslots}
        selected={selectedTimeslot}
        onChange={(slot) => {
          setSelectedTimeslot(slot);
          setSelectedCourt(null);
          setCourts([]);
        }}
      />

      <SelectCourt
        courts={courts}
        selected={selectedCourt}
        onChange={setSelectedCourt}
      />

      <BookingSummaryCard
        date={selectedDate}
        timeslot={selectedTimeslot}
        court={selectedCourt}
        amount={
          selectedClass
            ? `Rp ${selectedClass.price.toLocaleString("id-ID")}`
            : undefined
        }
        onConfirm={handleConfirmBooking}
      />
    </section>
  );
}
