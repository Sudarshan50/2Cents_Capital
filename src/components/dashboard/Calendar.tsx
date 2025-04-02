
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  date: Date;
  title: string;
  type: 'payment' | 'maturity' | 'trade';
}

interface CalendarProps {
  events?: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    event.date.toDateString() === (date?.toDateString() || '')
  );

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(event => event.date.toDateString() === day.toDateString());
  };

  // Custom day renderer to show dots for event days
  const renderDay = (day: Date) => {
    const hasEvent = isDayWithEvent(day);
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasEvent && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-quant-yellow rounded-full" />
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            Day: ({ date }) => renderDay(date),
          }}
        />
        
        {/* Events for selected date */}
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            {date ? (
              <span>
                Events for {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            ) : (
              'Select a date to view events'
            )}
          </h3>
          
          {selectedDateEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedDateEvents.map((event, index) => (
                <li key={index} className="border-l-2 pl-3 py-1 text-sm" style={{ borderColor: 
                  event.type === 'payment' ? '#10B981' : 
                  event.type === 'maturity' ? '#F59E0B' : 
                  '#6366F1' 
                }}>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-500 capitalize">{event.type}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No events for this date</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
