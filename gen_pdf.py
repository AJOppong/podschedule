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
    c.setFont("Helvetica-Bold", 20)
    c.drawString(70, height - 180, "DO'S")
    
    dos = [
        "Arrive 15 minutes",
        "before your scheduled",
        "session to prep.",
        "",
        "Bring scripts on a",
        "digital device or",
        "non-crinkly paper.",
        "",
        "Keep hydrated",
        "(water only)",
        "prior to recording.",
        "",
        "Communicate special",
        "requirements in",
        "advance."
    ]
    
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.HexColor("#ffffff"))
    y = height - 220
    for line in dos:
        c.drawString(70, y, line)
        y -= 25
        
    # Don'ts section (Right)
    c.setFillColor(colors.HexColor("#ef4444"))
    c.setFont("Helvetica-Bold", 20)
    c.drawString(width/2.0 + 20, height - 180, "DON'TS")
    
    donts = [
        "No food or sticky",
        "drinks in the studio.",
        "(Water is okay).",
        "",
        "Avoid noisy jewelry",
        "or rustling clothing",
        "near the mics.",
        "",
        "Do not adjust",
        "microphones without",
        "assistance.",
        "",
        "Keep mobile phones",
        "on silent or airplane",
        "mode."
    ]
    
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.HexColor("#ffffff"))
    y = height - 220
    for line in donts:
        c.drawString(width/2.0 + 20, y, line)
        y -= 25
        
    # Footer
    c.setFont("Helvetica-Oblique", 12)
    c.setFillColor(colors.HexColor("#888888"))
    c.drawCentredString(width/2.0, 50, "Thank you for helping us maintain a professional recording environment!")
    
    c.save()
    print(f"Generated {pdf_filename}")

if __name__ == "__main__":
    create_etiquette_pdf()
