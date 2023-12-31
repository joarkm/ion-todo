import { addDays, addWeeks, endOfDay, startOfWeek } from 'date-fns';

export function calculateDueDate(
  relativeDue: 'today' | 'tomorrow' | 'nextWeek'
): Date {
  const now = new Date();
  let dueDate = now;
  switch (relativeDue) {
    case 'today':
      dueDate = now;
      break;
    case 'tomorrow':
      dueDate = addDays(now, 1);
      break;
    case 'nextWeek':
      dueDate = startOfWeek(addWeeks(now, 1), { weekStartsOn: 1 });
      break;
    default:
      break;
  }

  return endOfDay(dueDate);
}
