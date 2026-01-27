import Button from "@/src/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingSuccessProps {
  reservationId?: string;
  className?: string;
  date?: string;
  time?: string;
  location?: string;
  amount?: number;
  status?: string;
  paymentMethod?: string;
}

export default function BookingSuccessPage({
  reservationId = "#ZP-8849201",
  className = "Sunrise Flow Yoga",
  date = "2026-01-27",
  time = "08:00",
  location = "ZenPilates Main Studio",
  amount = 25,
  status = "PAID",
  paymentMethod = "Visa ending in 4242",
}: BookingSuccessProps) {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-start py-12 px-4 md:px-10 min-h-screen bg-background-light dark:bg-background-dark text-[#0e101b] dark:text-[#f8f9fc]">
      <div className="max-w-180 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <CheckCircle2 className="w-14 h-14" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your booking is confirmed!
          </h1>
          <p className="text-[#4e5a97] dark:text-[#a1a6c5] max-w-md">
            We&apos;re excited to see you at the studio. A confirmation email
            with receipt details has been sent to your inbox.
          </p>
        </div>

        {/* Card Summary */}
        <div className="bg-white dark:bg-[#1a1d2e] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-[#e7e9f3] dark:border-[#2a2e45]">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  Status: {status}
                </span>
                <h3 className="text-xl font-bold pt-2">Booking Summary</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#e7e9f3] dark:border-[#2a2e45]">
              <div className="space-y-1">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-xs font-semibold uppercase">
                  Class
                </p>
                <p className="text-base font-medium">{className}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-xs font-semibold uppercase">
                  Time
                </p>
                <p className="text-base font-medium">{time}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-xs font-semibold uppercase">
                  Date
                </p>
                <p className="text-base font-medium">{date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-xs font-semibold uppercase">
                  Location
                </p>
                <p className="text-base font-medium">{location}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-sm">
                  Payment Method
                </p>
                <p className="text-sm font-medium">{paymentMethod}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#4e5a97] dark:text-[#a1a6c5] text-sm">
                  Reservation ID
                </p>
                <p className="text-sm font-medium text-right">
                  {reservationId}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p className="text-[#0e101b] dark:text-white font-bold">
                  Total Amount Paid
                </p>
                <p className="text-lg font-bold text-primary">
                  ${amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4">
          <Button
            className="w-full sm:w-auto min-w-50 text-base font-bold"
            onClick={() => router.push("/bookings")}
          >
            View Booking History
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto min-w-50 text-base font-bold"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>

        {/* Footer Note */}
        <div className="flex justify-center items-center gap-2 text-[#4e5a97] dark:text-[#a1a6c5] text-xs pb-12">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>
            Please arrive 10 minutes before class starts. Towels are provided.
          </span>
        </div>
      </div>
    </main>
  );
}
