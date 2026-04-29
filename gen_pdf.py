from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def create_etiquette_pdf():
    pdf_filename = "imgs/studio_etiquette.pdf"
    
    # Create canvas
    c = canvas.Canvas(pdf_filename, pagesize=letter)
    width, height = letter
    
    # Background
    c.setFillColor(colors.HexColor("#1e1e24"))
    c.rect(0, 0, width, height, stroke=0, fill=1)
    
    # Title
    c.setFillColor(colors.HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(width/2.0, height - 80, "KEC Podcast Studios")
    
    c.setFont("Helvetica", 18)
    c.setFillColor(colors.HexColor("#a0a0aa"))
    c.drawCentredString(width/2.0, height - 110, "Studio Etiquette & Guidelines")
    
    c.setStrokeColor(colors.HexColor("#333333"))
    c.setLineWidth(2)
    c.line(50, height - 130, width - 50, height - 130)
    
    # Do's section (Left)
    c.setFillColor(colors.HexColor("#22c55e"))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(70, height - 160, "DO'S")
    
    dos = [
        "Arrive On Time",
        "(10-15m early)",
        "",
        "Come Fully Prepared",
        "(Topics/Script ready)",
        "",
        "Respect Booking Time",
        "(Start/End on time)",
        "",
        "Follow Instructions",
        "(Technicians/Staff)",
        "",
        "Care for Equipment",
        "(Handle responsibly)",
        "",
        "Maintain Cleanliness",
        "",
        "Dress/Behave Well",
        "",
        "Speak Respectfully",
        "(Take turns)",
        "",
        "Keep Noise Minimum",
        "(Silence phones)"
    ]
    
    c.setFont("Helvetica", 11)
    c.setFillColor(colors.HexColor("#ffffff"))
    y = height - 190
    for line in dos:
        c.drawString(70, y, line)
        y -= 18
        
    # Don'ts section (Right)
    c.setFillColor(colors.HexColor("#ef4444"))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(width/2.0 + 20, height - 160, "DON'TS")
    
    donts = [
        "Don't Come Late or",
        "Unprepared.",
        "",
        "No Food or Drinks",
        "(Spills damage gear).",
        "",
        "No Touching Gear",
        "without permission.",
        "",
        "Don't Overcrowd",
        "(Approved guests).",
        "",
        "No Inappropriate",
        "Content/Language.",
        "",
        "No Extensions",
        "without approval.",
        "",
        "Don't Misuse or",
        "Remove Equipment.",
        "",
        "Don't Ignore Rules.",
        "(Violations lead to",
        "access suspension)."
    ]
    
    c.setFont("Helvetica", 11)
    c.setFillColor(colors.HexColor("#ffffff"))
    y = height - 190
    for line in donts:
        c.drawString(width/2.0 + 20, y, line)
        y -= 18
        
    # Footer
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(colors.HexColor("#888888"))
    footer_text = "“The podcast studio is a shared professional space. Your cooperation ensures a smooth experience for everyone.”"
    c.drawCentredString(width/2.0, 40, footer_text)
    
    c.save()
    print(f"Generated {pdf_filename}")

if __name__ == "__main__":
    create_etiquette_pdf()
