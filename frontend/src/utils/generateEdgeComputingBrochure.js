import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

// Premium Edge Computing Course Brochure PDF Generator
export const generateEdgeComputingBrochure = () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    
    // Colors (RGB arrays)
    const darkNavy = [10, 15, 26];
    const cyan = [6, 182, 212];
    const gold = [212, 175, 55];
    const white = [255, 255, 255];
    const gray = [156, 163, 175];
    const lightBlue = [240, 249, 255];
    
    // Helper functions
    const addWrappedText = (text, x, y, maxWidth, lineHeight = 6) => {
      if (!text) return y;
      const lines = doc.splitTextToSize(String(text), maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };
    
    const addNewPage = () => {
      doc.addPage();
      doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.rect(0, 0, pageWidth, 15, 'F');
      doc.setFontSize(8);
      doc.setTextColor(cyan[0], cyan[1], cyan[2]);
      doc.text('Saint-Georges Academy', margin, 10);
      doc.text('Edge Computing for Smart Territories', pageWidth - margin, 10, { align: 'right' });
      return 25;
    };
    
    // ==================== PAGE 1: COVER ====================
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Top badge
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.roundedRect(pageWidth/2 - 35, 30, 70, 8, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('PREMIUM PROGRAMME', pageWidth/2, 35.5, { align: 'center' });
    
    // Academy name
    doc.setFontSize(14);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('SAINT-GEORGES ACADEMY', pageWidth/2, 55, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Cisco Networking Academy | Stormshield Partner', pageWidth/2, 62, { align: 'center' });
    
    // Main title
    doc.setFontSize(28);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('EDGE COMPUTING', pageWidth/2, 95, { align: 'center' });
    doc.text('FOR SMART TERRITORIES', pageWidth/2, 108, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(cyan[0], cyan[1], cyan[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Resilience, Smart City Services & Cybersecurity', pageWidth/2, 125, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text('through the Metkovic Case Study', pageWidth/2, 133, { align: 'center' });
    
    // Central info box
    doc.setDrawColor(cyan[0], cyan[1], cyan[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin + 20, 145, contentWidth - 40, 50, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text('3-MONTH ONLINE PROGRAMME', pageWidth/2, 158, { align: 'center' });
    doc.text('Live Weekly Tutoring | Practical Labs | Capstone Project', pageWidth/2, 166, { align: 'center' });
    doc.text('Certificate of Achievement | Stormshield CSNA Preparation', pageWidth/2, 174, { align: 'center' });
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Official CSNA Certification Available', pageWidth/2, 185, { align: 'center' });
    
    // Price badge
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.roundedRect(pageWidth/2 - 30, 210, 60, 20, 3, 3, 'F');
    doc.setFontSize(18);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text('4 500 EUR', pageWidth/2, 223, { align: 'center' });
    
    // Bottom info
    doc.setFontSize(8);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('www.saint-georges.academy | contact@saint-georges.academy', pageWidth/2, 260, { align: 'center' });
    doc.text('+33 (0)5 49 22 75 10 | 2 venelle des Amandiers, 86200 Loudun, France', pageWidth/2, 267, { align: 'center' });
    
    // ==================== PAGE 2: INTRODUCTION ====================
    let y = addNewPage();
    
    // Section title
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Introduction', margin + 8, y + 14);
    y += 30;
    
    // About Saint-Georges Academy
    doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
    doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('About Saint-Georges Academy', margin + 5, y + 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const aboutText = 'Saint-Georges Academy is an official Cisco Networking Academy and Stormshield training partner, delivering professional certifications in networking, cybersecurity, and emerging technologies. Based in Loudun, France, we combine rigorous technical education with real-world practical applications.';
    addWrappedText(aboutText, margin + 5, y + 18, contentWidth - 10, 5);
    y += 55;
    
    // About the course
    doc.setFontSize(12);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('About This Programme', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const courseIntro = 'This premium 3-month programme offers an immersive journey into edge computing, smart city infrastructure, and cybersecurity. Using the Croatian town of Metkovic as a real-world case study, learners will design, deploy, and secure resilient local computing platforms that serve critical municipal functions.';
    y = addWrappedText(courseIntro, margin, y, contentWidth, 5.5);
    y += 10;
    
    // Why this matters box
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin, y, contentWidth, 55, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(cyan[0], cyan[1], cyan[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Why This Programme Matters', margin + 5, y + 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(white[0], white[1], white[2]);
    const whyMatters = 'As municipalities worldwide face increasing demands for digital resilience, environmental monitoring, and secure local services, the need for professionals who understand edge computing has never been greater. This programme prepares you to lead smart territory initiatives, combining technical expertise with practical cybersecurity skills certified by Stormshield.';
    addWrappedText(whyMatters, margin + 5, y + 22, contentWidth - 10, 5);
    y += 65;
    
    // Key benefits
    doc.setFontSize(11);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Programme Benefits', margin, y);
    y += 8;
    
    const benefits = [
      'Expert-led weekly live tutoring sessions',
      'Hands-on practical labs with real scenarios',
      'Professional capstone project for your portfolio',
      'Certificate of Achievement from Saint-Georges Academy',
      'Stormshield CSNA certification preparation',
      'Option to take the official CSNA certification exam'
    ];
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    benefits.forEach((benefit) => {
      doc.setTextColor(cyan[0], cyan[1], cyan[2]);
      doc.text('*', margin, y);
      doc.setTextColor(75, 85, 99);
      doc.text(benefit, margin + 5, y);
      y += 6;
    });
    
    // ==================== PAGE 3: WHAT IS EDGE COMPUTING ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('What is Edge Computing?', margin + 8, y + 14);
    y += 35;
    
    // Definition box
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.setFont('helvetica', 'normal');
    const edgeDef = 'Edge computing is the practice of processing data closer to where it is generated rather than relying entirely on distant cloud systems. Instead of sending all data to remote data centres, edge computing brings intelligence and processing power to local infrastructure.';
    addWrappedText(edgeDef, margin + 5, y + 12, contentWidth - 10, 5.5);
    
    doc.setTextColor(cyan[0], cyan[1], cyan[2]);
    doc.setFont('helvetica', 'bold');
    const edgeBenefit = 'This enables faster local decisions, more resilient digital services, and better continuity during internet outages.';
    addWrappedText(edgeBenefit, margin + 5, y + 35, contentWidth - 10, 5.5);
    y += 60;
    
    // Why it matters
    doc.setFontSize(12);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Why Edge Computing Matters for Towns Like Metkovic', margin, y);
    y += 10;
    
    const townBenefits = [
      { title: 'Faster Local Decisions', desc: 'Process critical data on-site without cloud latency' },
      { title: 'Resilient Services', desc: 'Maintain operations when internet connectivity fails' },
      { title: 'Environmental Monitoring', desc: 'Real-time flood, fire, and pollution alerts' },
      { title: 'Emergency Communications', desc: 'Hospital and first responder coordination' }
    ];
    
    doc.setFontSize(9);
    townBenefits.forEach((item, index) => {
      const xPos = margin + ((index % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(index/2) * 18);
      
      doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 15, 2, 2, 'F');
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, xPos + 3, yPos + 6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(item.desc, xPos + 3, yPos + 11);
      doc.setFontSize(9);
    });
    
    // ==================== PAGE 4: WHY METKOVIC ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Why Metkovic?', margin + 8, y + 14);
    y += 30;
    
    // Metkovic intro
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('A Real Territorial Case Study', margin + 5, y + 5.5);
    y += 15;
    
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.setFont('helvetica', 'normal');
    const metkovicIntro = 'Metkovic is a Croatian town situated at the mouth of the Neretva River, near the border with Bosnia and Herzegovina. Its unique geography and strategic position make it an ideal case study for edge computing applications in smart territory management.';
    y = addWrappedText(metkovicIntro, margin, y, contentWidth, 5.5);
    y += 10;
    
    // Challenges
    doc.setFontSize(11);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Territorial Challenges & Opportunities', margin, y);
    y += 8;
    
    const challenges = [
      { cat: 'Environmental', items: ['River and flood risk', 'Water quality monitoring', 'Fire detection', 'Temperature tracking'] },
      { cat: 'Infrastructure', items: ['Traffic management', 'Sound pollution', 'Public Wi-Fi', 'Local hosting'] },
      { cat: 'Critical Services', items: ['Hospital comms', 'Emergency responders', 'Local media', 'Administration'] },
      { cat: 'Strategic', items: ['Border awareness', 'Wildlife observation', 'Agriculture', 'Resilient services'] }
    ];
    
    doc.setFontSize(9);
    challenges.forEach((challenge, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 38);
      
      doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 34, 2, 2, 'F');
      
      doc.setTextColor(cyan[0], cyan[1], cyan[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(challenge.cat, xPos + 3, yPos + 7);
      
      doc.setTextColor(white[0], white[1], white[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      challenge.items.forEach((item, i) => {
        doc.text('- ' + item, xPos + 3, yPos + 14 + (i * 5));
      });
      doc.setFontSize(9);
    });
    
    // ==================== PAGE 5: COURSE HIGHLIGHTS ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Course Highlights', margin + 8, y + 14);
    y += 35;
    
    const highlights = [
      { num: '3', title: '3-Month Online Programme', desc: 'Comprehensive curriculum delivered entirely online' },
      { num: '1h', title: 'Weekly Live Tutoring', desc: 'One hour of live video tutoring each week' },
      { num: 'LAB', title: 'Practical Labs', desc: 'Hands-on exercises using real-world scenarios' },
      { num: 'PRJ', title: 'Capstone Project', desc: 'Design a complete edge platform for Metkovic' },
      { num: 'CRT', title: 'Certificate of Achievement', desc: 'Official certificate from Saint-Georges Academy' },
      { num: 'CSN', title: 'Stormshield Preparation', desc: 'Full preparation for official CSNA certification' }
    ];
    
    highlights.forEach((h, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 32);
      
      // Icon circle
      doc.setFillColor(cyan[0], cyan[1], cyan[2]);
      doc.circle(xPos + 10, yPos + 10, 8, 'F');
      doc.setFontSize(7);
      doc.setTextColor(white[0], white[1], white[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(h.num, xPos + 10, yPos + 12, { align: 'center' });
      
      // Text
      doc.setFontSize(10);
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.text(h.title, xPos + 22, yPos + 8);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(h.desc, contentWidth/2 - 30);
      doc.text(descLines, xPos + 22, yPos + 14);
    });
    
    y += 105;
    
    // CSNA box
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.roundedRect(margin, y, contentWidth, 28, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Official Stormshield CSNA Certification', margin + 5, y + 11);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Upon completing this programme, you can sit the official Stormshield CSNA', margin + 5, y + 19);
    doc.text('certification exam, validating your expertise in network security.', margin + 5, y + 25);
    
    // ==================== PAGE 6: PROGRAMME OVERVIEW ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Programme Overview', margin + 8, y + 14);
    y += 35;
    
    const modules = [
      { num: '01', title: 'Edge Computing Fundamentals', topics: ['Core concepts', 'Edge vs cloud', 'Platforms', 'Deployment'] },
      { num: '02', title: 'Smart City Infrastructure', topics: ['IoT sensors', 'Data collection', 'Protocols', 'Integration'] },
      { num: '03', title: 'Environmental Monitoring', topics: ['Flood monitoring', 'Fire detection', 'Air quality', 'Temperature'] },
      { num: '04', title: 'Critical Services', topics: ['Traffic mgmt', 'Emergency comms', 'Hospital coord', 'Media continuity'] },
      { num: '05', title: 'Resilient Infrastructure', topics: ['Offline ops', 'Local hosting', 'Redundancy', 'Disaster recovery'] },
      { num: '06', title: 'Cybersecurity & Stormshield', topics: ['Security arch', 'Firewall config', 'Threat detection', 'CSNA prep'] }
    ];
    
    modules.forEach((mod, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 40);
      
      doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 36, 2, 2, 'F');
      
      // Module number
      doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.roundedRect(xPos + 2, yPos + 2, 14, 9, 1, 1, 'F');
      doc.setFontSize(7);
      doc.setTextColor(cyan[0], cyan[1], cyan[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(mod.num, xPos + 9, yPos + 8, { align: 'center' });
      
      // Title
      doc.setFontSize(9);
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.text(mod.title, xPos + 19, yPos + 8);
      
      // Topics
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      mod.topics.forEach((topic, i) => {
        doc.text('- ' + topic, xPos + 5, yPos + 16 + (i * 5));
      });
    });
    
    // ==================== PAGE 7: WHO IS THIS FOR ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Who Is This Course For?', margin + 8, y + 14);
    y += 35;
    
    const audiences = [
      { title: 'Technical Professionals', desc: 'IT administrators, network engineers seeking edge computing expertise.' },
      { title: 'Municipalities', desc: 'Technical staff modernising local digital infrastructure.' },
      { title: 'Cybersecurity Practitioners', desc: 'Security professionals wanting Stormshield certification.' },
      { title: 'Institutions & Schools', desc: 'Developing internal expertise in resilient local hosting.' },
      { title: 'Career Changers', desc: 'Transitioning into smart city or IoT domains.' },
      { title: 'Consultants', desc: 'Serving municipal and institutional clients.' }
    ];
    
    audiences.forEach((aud, idx) => {
      const yPos = y + (idx * 22);
      doc.setFillColor(idx % 2 === 0 ? lightBlue[0] : 255, idx % 2 === 0 ? lightBlue[1] : 255, idx % 2 === 0 ? lightBlue[2] : 255);
      doc.roundedRect(margin, yPos, contentWidth, 19, 2, 2, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(aud.title, margin + 5, yPos + 8);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(aud.desc, margin + 5, yPos + 14);
    });
    
    // ==================== PAGE 8: PRICING ====================
    y = addNewPage();
    
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Investment & Value', margin + 8, y + 14);
    y += 35;
    
    // Price card
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text('Programme Investment', margin + 10, y + 15);
    
    doc.setFontSize(32);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('4 500 EUR', margin + 10, y + 35);
    
    doc.setFontSize(10);
    doc.setTextColor(cyan[0], cyan[1], cyan[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete 3-month programme', margin + 85, y + 25);
    doc.text('All materials included', margin + 85, y + 33);
    y += 55;
    
    // What's included
    doc.setFontSize(11);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('What Your Investment Includes', margin, y);
    y += 10;
    
    const valueItems = [
      '12 Hours of Live Expert Tutoring',
      'Complete Course Materials & Resources',
      'Practical Laboratory Access',
      'Capstone Project Support',
      'Certificate of Achievement',
      'CSNA Exam Preparation'
    ];
    
    valueItems.forEach((item, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 12);
      
      doc.setFillColor(cyan[0], cyan[1], cyan[2]);
      doc.circle(xPos + 4, yPos + 2, 2, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
      doc.setFont('helvetica', 'normal');
      doc.text(item, xPos + 10, yPos + 4);
    });
    
    // ==================== PAGE 9: CALL TO ACTION ====================
    y = addNewPage();
    
    // Full page CTA
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(margin - 10, y - 10, contentWidth + 20, 170, 'F');
    
    doc.setFontSize(24);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Begin Your Journey', pageWidth/2, y + 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Join the next generation of smart territory professionals', pageWidth/2, y + 45, { align: 'center' });
    
    // CTA buttons
    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.roundedRect(pageWidth/2 - 35, y + 60, 70, 14, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLY NOW', pageWidth/2, y + 69, { align: 'center' });
    
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.roundedRect(pageWidth/2 - 35, y + 80, 70, 14, 3, 3, 'F');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text('REQUEST INFO', pageWidth/2, y + 89, { align: 'center' });
    
    // Contact
    doc.setFontSize(10);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Contact Saint-Georges Academy', pageWidth/2, y + 110, { align: 'center' });
    
    doc.setTextColor(cyan[0], cyan[1], cyan[2]);
    doc.text('contact@saint-georges.academy', pageWidth/2, y + 120, { align: 'center' });
    doc.text('+33 (0)5 49 22 75 10', pageWidth/2, y + 128, { align: 'center' });
    doc.text('www.saint-georges.academy', pageWidth/2, y + 136, { align: 'center' });
    
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(8);
    doc.text('2 venelle des Amandiers, 86200 Loudun, France', pageWidth/2, y + 150, { align: 'center' });
    
    // Footer branding
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SAINT-GEORGES ACADEMY', pageWidth/2, y + 162, { align: 'center' });
    
    // Save PDF
    const fileName = 'Edge_Computing_Smart_Territories_Brochure_Saint-Georges-Academy.pdf';
    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, fileName);
    
    console.log('Brochure PDF generated:', fileName);
    return fileName;
    
  } catch (error) {
    console.error('Error generating brochure PDF:', error);
    alert('Error generating brochure: ' + error.message);
    return null;
  }
};

export default generateEdgeComputingBrochure;
