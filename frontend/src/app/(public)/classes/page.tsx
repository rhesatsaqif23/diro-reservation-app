"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClassCard from "@/src/components/classes/ClassCard";
import { Class } from "@/src/domain/class";
import { ClassService } from "@/src/services/class.service";

export default function ClassesPage() {
  const router = useRouter();

  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const data = await ClassService.getAll();
        setClasses(data.filter((c) => c.is_active));
      } catch (err) {
        console.error(err);
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSelectClass = (classId: string) => {
    router.push(`/booking?classId=${classId}`);
  };

  return (
    <section className="container-page pt-8 pb-16">
      {/* Headline */}
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Choose Your Session
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Select the Pilates session that best fits your fitness level and
          goals.
        </p>
      </div>

      {loading && (
        <div className="text-center text-slate-500">Loading classes...</div>
      )}

      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {classes.map((item, index) => (
            <ClassCard
              key={item.id}
              data={item}
              popular={item.name === "Reformer Basic"}
              priorityImage={index === 0}
              onSelect={handleSelectClass}
            />
          ))}
        </div>
      )}
    </section>
  );
}
