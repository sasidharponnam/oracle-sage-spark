import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      };
    };
    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { val: String(timeLeft.days).padStart(2, "0"), label: "Days" },
    { val: String(timeLeft.hours).padStart(2, "0"), label: "Hours" },
    { val: String(timeLeft.mins).padStart(2, "0"), label: "Mins" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      {items.map((t) => (
        <div key={t.label} className="text-center">
          <div className="text-3xl font-bold text-accent">{t.val}</div>
          <div className="text-xs text-muted-foreground">{t.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
