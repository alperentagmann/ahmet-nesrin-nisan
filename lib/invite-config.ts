// Tüm davetiye içeriği burada sabit olarak tanımlanır.
// Tek bir düğün için kullanılacağından bu dosyayı düzenlemek yeterlidir.

export const inviteConfig = {
  coupleNames: {
    first: "Nesrin",
    second: "Ahmet Burak",
  },
  // Anne-baba isimleri, gelin ve damat tarafı için ayrı ayrı.
  parents: {
    bride: {
      label: "Gelinin Ailesi",
      names: "Hadice ve Tuncay Saraç",
    },
    groom: {
      label: "Damadın Ailesi",
      names: "Mine ve A.Kadir Tağman",
    },
  },
  eventDate: "2026-07-12T13:00:00",
  dateLabel: "Pazar 12.07.26",
  timeLabel: "saat 13:00-16:00",
  venueName: "Lidya Garden",
  venueAddress: "Karaağaç, Büyükçekmece Karaağaç Köyü Yolu No:1, 34488 Büyükçekmece/İstanbul",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Lidya+Garden+Karaagac+Buyukcekmece",
  receptionNote: "",
  rsvpDeadlineLabel: "10.05.26",
} as const;
