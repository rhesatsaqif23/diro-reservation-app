import { BookingSummary } from "@/src/domain/booking";

interface Props {
  summary: BookingSummary;
}

export default function PricingSection({ summary }: Props) {
  if (!summary?.class?.price) return null;

  const price = summary.class.price;
  const adminFee = Math.round(price * 0.1);
  const total = price + adminFee;

  return (
    <div className="px-6 pb-6">
      <div className="border-t border-dashed border-slate-300 pt-6 dark:border-slate-700">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Session Subtotal
          </span>
          <span className="text-slate-900 dark:text-white">
            Rp{price.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="mb-4 flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Admin Fee</span>
          <span className="text-slate-900 dark:text-white">
            Rp{adminFee.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4">
          <span className="text-lg font-bold text-primary">Total Amount</span>
          <span className="text-2xl font-black tracking-tight text-primary">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}
