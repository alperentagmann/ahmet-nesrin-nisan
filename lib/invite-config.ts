// Tüm davetiye içeriği burada sabit olarak tanımlanır.
// Tek bir düğün için kullanılacağından bu dosyayı düzenlemek yeterlidir.

export const inviteConfig = {
  coupleNames: {
    first: "Nesrin",
    second: "Ahmet Burak",
  },
  eventDate: "2026-07-12T13:00:00",
  dateLabel: "Pazar 12.07.26",
  timeLabel: "saat 13:00-16:00",
  venueName: "Dadya Wedding 3",
  venueAddress: "Seyri Sefa Restaurant (Karaağaç Sokak 6, Büyükçekmece, 34500, TR)",
  mapsUrl:
    "https://www.google.com/maps/place/41%C2%B004'40.9%22N+28%C2%B034'59.0%22E/@41.0780258,28.5804768,17z/data=!3m1!4b1!4m4!3m3!8m2!3d41.0780258!4d28.5830517?hl=tr&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
  receptionNote: "",
  rsvpDeadlineLabel: "10.05.26",
} as const;
