namespace Velocity.Api.Models;

public static class GermanLabels
{
    public static string ToGermanLabel(this BookingStatus status) =>
        status switch
        {
            BookingStatus.Pending => "Anfrage",
            BookingStatus.Confirmed => "Bestätigt",
            BookingStatus.Cancelled => "Storniert",
            BookingStatus.Rejected => "Abgelehnt",
            _ => status.ToString()
        };

    public static string ToGermanLabel(this BlockReason reason) =>
        reason switch
        {
            BlockReason.Admin => "Admin-Blockierung",
            BlockReason.Maintenance => "Wartung",
            BlockReason.Cleaning => "Reinigung",
            BlockReason.Private => "Privat blockiert",
            _ => reason.ToString()
        };
}
