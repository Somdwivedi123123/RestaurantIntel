'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  format?: 'currency' | 'percentage' | 'number';
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-blue-600',
  format = 'number',
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    if (format === 'currency') return formatCurrency(val);
    if (format === 'percentage') return formatPercentage(val / 100);
    return val.toLocaleString();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatValue(value)}
            </p>
            {change !== undefined && (
              <div className="flex items-center mt-2 text-sm">
                <span
                  className={cn(
                    'font-medium',
                    isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {isPositive ? '+' : ''}
                  {change.toFixed(1)}%
                </span>
                {changeLabel && (
                  <span className="text-gray-600 ml-2">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-lg bg-opacity-10', iconColor)}>
            <Icon className={cn('w-8 h-8', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
