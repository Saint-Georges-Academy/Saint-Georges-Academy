import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Generate a professional PDF program for a course
export const generateCoursePDF = (course) => {
  try {
    if (!course) {
      console.error('generateCoursePDF: No course data provided');
      alert('Erreur: Données du cours non disponibles');
      return null;
    }
    
    console.log('Generating PDF for course:', course.id);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

  // Colors
  const navyBlue = [15, 31, 61]; // #0f1f3d
  const gold = [212, 175, 55]; // #d4af37
  const gray = [100, 100, 100];

  // Helper function to add text with word wrap
  const addWrappedText = (text, x, y, maxWidth, lineHeight = 7) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Helper function to check page break
  const checkPageBreak = (neededSpace) => {
    if (yPosition + neededSpace > 270) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // ========== HEADER ==========
  // Background rectangle
  doc.setFillColor(...navyBlue);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Academy name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Saint-Georges Academy', margin, 20);

  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gold);
  doc.text('Official Cisco Networking Academy', margin, 30);

  // Course category badge
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`Programme de formation : ${course.category}`, margin, 42);

  yPosition = 60;

  // ========== COURSE TITLE ==========
  doc.setTextColor(...navyBlue);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(course.title, margin, yPosition, pageWidth - 2 * margin, 8);
  yPosition += 5;

  // Description
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  yPosition = addWrappedText(course.description, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  // ========== INFO BOX ==========
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 25, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(...navyBlue);
  doc.setFont('helvetica', 'bold');
  
  const infoY = yPosition + 10;
  doc.text(`Durée : ${course.duration}`, margin + 5, infoY);
  doc.text(`Niveau : ${course.level}`, margin + 60, infoY);
  
  if (course.onlinePrice) {
    doc.text(`En ligne : ${course.onlinePrice}€`, margin + 110, infoY);
  }
  if (course.inClassPrice) {
    doc.text(`Présentiel : ${course.inClassPrice}€`, margin + 5, infoY + 10);
  }
  if (course.certificationCost) {
    doc.text(`Certification : ${course.certificationCost}€ (non inclus)`, margin + 60, infoY + 10);
  }

  yPosition += 35;

  // ========== OBJECTIFS ==========
  checkPageBreak(40);
  doc.setFillColor(...gold);
  doc.rect(margin, yPosition, 4, 15, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navyBlue);
  doc.text('Objectifs de la formation', margin + 8, yPosition + 10);
  yPosition += 20;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  
  if (course.objectives) {
    course.objectives.forEach((objective, index) => {
      checkPageBreak(15);
      doc.setTextColor(...gold);
      doc.text(`${index + 1}.`, margin, yPosition);
      doc.setTextColor(...gray);
      yPosition = addWrappedText(objective, margin + 8, yPosition, pageWidth - 2 * margin - 8, 6);
      yPosition += 3;
    });
  }
  yPosition += 10;

  // ========== COMPÉTENCES VISÉES ==========
  if (course.practicalSkills) {
    checkPageBreak(40);
    doc.setFillColor(...gold);
    doc.rect(margin, yPosition, 4, 15, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navyBlue);
    doc.text('Compétences visées', margin + 8, yPosition + 10);
    yPosition += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    course.practicalSkills.forEach((skill) => {
      checkPageBreak(10);
      doc.setTextColor(...gold);
      doc.text('•', margin, yPosition);
      doc.setTextColor(...gray);
      yPosition = addWrappedText(skill, margin + 6, yPosition, pageWidth - 2 * margin - 6, 6);
      yPosition += 2;
    });
    yPosition += 10;
  }

  // ========== PROGRAMME DÉTAILLÉ (MODULES) ==========
  if (course.modules && course.modules.length > 0) {
    checkPageBreak(40);
    doc.setFillColor(...gold);
    doc.rect(margin, yPosition, 4, 15, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navyBlue);
    doc.text('Programme détaillé', margin + 8, yPosition + 10);
    yPosition += 25;

    course.modules.forEach((module) => {
      checkPageBreak(30);
      
      // Module header
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(margin, yPosition - 3, pageWidth - 2 * margin, 10, 2, 2, 'F');
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...navyBlue);
      doc.text(`Module ${module.number} : ${module.title}`, margin + 3, yPosition + 4);
      yPosition += 12;

      // Topics
      if (module.topics) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...gray);
        
        module.topics.forEach((topic) => {
          checkPageBreak(8);
          doc.text('  •  ' + topic, margin + 5, yPosition);
          yPosition += 5;
        });
      }
      yPosition += 5;
    });
  }

  // ========== PRÉREQUIS ==========
  if (course.prerequisites) {
    checkPageBreak(40);
    doc.setFillColor(...gold);
    doc.rect(margin, yPosition, 4, 15, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navyBlue);
    doc.text('Prérequis', margin + 8, yPosition + 10);
    yPosition += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const prereqs = Array.isArray(course.prerequisites) ? course.prerequisites : [];
    prereqs.forEach((prereq) => {
      checkPageBreak(10);
      doc.setTextColor(...gold);
      doc.text('•', margin, yPosition);
      doc.setTextColor(...gray);
      yPosition = addWrappedText(prereq, margin + 6, yPosition, pageWidth - 2 * margin - 6, 6);
      yPosition += 2;
    });
    yPosition += 10;
  }

  // ========== PUBLIC VISÉ ==========
  if (course.targetAudience) {
    checkPageBreak(40);
    doc.setFillColor(...gold);
    doc.rect(margin, yPosition, 4, 15, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navyBlue);
    doc.text('Public visé', margin + 8, yPosition + 10);
    yPosition += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const audience = Array.isArray(course.targetAudience) ? course.targetAudience : [];
    audience.forEach((target) => {
      checkPageBreak(10);
      doc.setTextColor(...gold);
      doc.text('•', margin, yPosition);
      doc.setTextColor(...gray);
      yPosition = addWrappedText(target, margin + 6, yPosition, pageWidth - 2 * margin - 6, 6);
      yPosition += 2;
    });
    yPosition += 10;
  }

  // ========== MODALITÉS ==========
  checkPageBreak(60);
  doc.setFillColor(...gold);
  doc.rect(margin, yPosition, 4, 15, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navyBlue);
  doc.text('Modalités de formation', margin + 8, yPosition + 10);
  yPosition += 20;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);

  const modalites = [
    { label: 'Méthodes pédagogiques', value: 'Cours théoriques, travaux pratiques, études de cas, simulations' },
    { label: 'Moyens techniques', value: course.id === 'unreal' ? 'Stations de travail professionnelles, logiciel Unreal Engine' : 'Plateforme Cisco NetAcad, Packet Tracer, équipements réseau' },
    { label: 'Évaluation', value: 'Évaluation continue + évaluation finale des compétences' },
    { label: 'Sanction', value: course.certificationCost ? 'Attestation de formation + possibilité de certification Cisco' : 'Attestation de formation' },
    { label: 'Accessibilité', value: 'Formation accessible aux personnes en situation de handicap. Contactez-nous pour étudier les adaptations.' }
  ];

  modalites.forEach((item) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navyBlue);
    doc.text(item.label + ' :', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    yPosition = addWrappedText(item.value, margin, yPosition + 5, pageWidth - 2 * margin, 5);
    yPosition += 8;
  });

  // ========== FOOTER ==========
  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer line
      doc.setDrawColor(...navyBlue);
      doc.setLineWidth(0.5);
      doc.line(margin, 280, pageWidth - margin, 280);
      
      // Footer text
      doc.setFontSize(8);
      doc.setTextColor(...gray);
      doc.text('Saint-Georges Academy | 2 venelle des Amandiers, 86200 Loudun | +33 (0)5 49 22 75 10 | contact@saint-georges.academy', margin, 286);
      doc.text(`SIRET : 528 616 113 00023 | Page ${i}/${pageCount}`, pageWidth - margin - 50, 286);
    }
  };

  addFooter();

  // Save the PDF
  const fileName = `Programme_${course.id.toUpperCase()}_Saint-Georges-Academy.pdf`;
  doc.save(fileName);
  
  console.log('PDF generated successfully:', fileName);
  return fileName;
  
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Erreur lors de la génération du PDF: ' + error.message);
    return null;
  }
};

export default generateCoursePDF;
