"use client";

import { useRouter } from "next/navigation";
import { Plus, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EventCard from "@/components/event-card";

export default function MyEventsPage() {
  const router = useRouter();

  const { data: events, isLoading } = useConvexQuery(api.events.getMyEvents);
  const { mutate: deleteEvent } = useConvexMutation(api.events.deleteEvent);

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone and will permanently delete the event and all associated registrations."
    );

    if (!confirmed) return;

    try {
      await deleteEvent({ eventId });
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to delete event");
    }
  };

  const handleEventClick = (eventId) => {
    router.push(`/my-events/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Events</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage your created events and track attendees
            </p>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link href="/create-event">
              <Plus className="w-5 h-5" />
              Create New Event
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        {events?.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-dashed">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/50 text-purple-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">No events created yet</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Get started by creating your first event and share it with your attendees.
              </p>
              <Button asChild className="gap-2 mt-2">
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  Create Your First Event
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          /* Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                action="event"
                onClick={() => handleEventClick(event._id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}