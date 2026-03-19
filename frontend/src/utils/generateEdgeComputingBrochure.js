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
    
    // Colors
    const darkNavy = [10, 15, 26]; // #0a0f1a
    const navy = [15, 23, 42]; // #0f172a
    const cyan = [6, 182, 212]; // #06b6d4
    const gold = [212, 175, 55]; // #d4af37
    const white = [255, 255, 255];
    const gray = [156, 163, 175];
    const lightGray = [229, 231, 235];
    
    // Helper functions
    const addWrappedText = (text, x, y, maxWidth, lineHeight = 6) => {
      if (!text) return y;
      const lines = doc.splitTextToSize(String(text), maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };
    
    const drawGradientRect = (x, y, w, h) => {
      doc.setFillColor(...darkNavy);
      doc.rect(x, y, w, h, 'F');
    };
    
    const addNewPage = () => {
      doc.addPage();
      // Add dark header bar on each page
      doc.setFillColor(...darkNavy);
      doc.rect(0, 0, pageWidth, 15, 'F');
      doc.setFontSize(8);
      doc.setTextColor(...cyan);
      doc.text('Saint-Georges Academy', margin, 10);
      doc.text('Edge Computing for Smart Territories', pageWidth - margin, 10, { align: 'right' });
      return 25;
    };
    
    // ==================== PAGE 1: COVER ====================
    drawGradientRect(0, 0, pageWidth, pageHeight);
    
    // Decorative elements
    doc.setFillColor(6, 182, 212, 0.1);
    doc.circle(pageWidth - 30, 50, 60, 'F');
    doc.circle(30, pageHeight - 50, 40, 'F');
    
    // Top badge
    doc.setFillColor(...cyan);
    doc.roundedRect(pageWidth/2 - 35, 30, 70, 8, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('PREMIUM PROGRAMME', pageWidth/2, 35.5, { align: 'center' });
    
    // Academy name
    doc.setFontSize(14);
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.text('SAINT-GEORGES ACADEMY', pageWidth/2, 55, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Cisco Networking Academy | Stormshield Partner', pageWidth/2, 62, { align: 'center' });
    
    // Main title
    doc.setFontSize(28);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    const title1 = 'EDGE COMPUTING';
    const title2 = 'FOR SMART TERRITORIES';
    doc.text(title1, pageWidth/2, 95, { align: 'center' });
    doc.text(title2, pageWidth/2, 108, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(...cyan);
    doc.setFont('helvetica', 'normal');
    doc.text('Resilience, Smart City Services & Cybersecurity', pageWidth/2, 125, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(...gray);
    doc.text('through the Metkovic Case Study', pageWidth/2, 133, { align: 'center' });
    
    // Central visual box
    doc.setDrawColor(...cyan);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin + 20, 145, contentWidth - 40, 50, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text('3-MONTH ONLINE PROGRAMME', pageWidth/2, 158, { align: 'center' });
    doc.text('Live Weekly Tutoring | Practical Labs | Capstone Project', pageWidth/2, 166, { align: 'center' });
    doc.text('Certificate of Achievement | Stormshield CSNA Preparation', pageWidth/2, 174, { align: 'center' });
    doc.setTextColor(...gold);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Official CSNA Certification Available', pageWidth/2, 185, { align: 'center' });
    
    // Price badge
    doc.setFillColor(...gold);
    doc.roundedRect(pageWidth/2 - 30, 210, 60, 20, 3, 3, 'F');
    doc.setFontSize(18);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('4 500 EUR', pageWidth/2, 223, { align: 'center' });
    
    // Bottom info
    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
    doc.text('www.saint-georges.academy | contact@saint-georges.academy', pageWidth/2, 260, { align: 'center' });
    doc.text('+33 (0)5 49 22 75 10 | 2 venelle des Amandiers, 86200 Loudun, France', pageWidth/2, 267, { align: 'center' });
    
    // ==================== PAGE 2: INTRODUCTION ====================
    let y = addNewPage();
    
    // Section title
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Introduction', margin + 8, y + 14);
    y += 30;
    
    // About Saint-Georges Academy
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(...darkNavy);
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
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('About This Programme', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const courseIntro = 'This premium 3-month programme offers an immersive journey into edge computing, smart city infrastructure, and cybersecurity. Using the Croatian town of Metkovic as a real-world case study, learners will design, deploy, and secure resilient local computing platforms that serve critical municipal functions.';
    y = addWrappedText(courseIntro, margin, y, contentWidth, 5.5);
    y += 10;
    
    // Why this matters
    doc.setFillColor(...darkNavy);
    doc.roundedRect(margin, y, contentWidth, 55, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(...cyan);
    doc.setFont('helvetica', 'bold');
    doc.text('Why This Programme Matters', margin + 5, y + 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...white);
    const whyMatters = 'As municipalities worldwide face increasing demands for digital resilience, environmental monitoring, and secure local services, the need for professionals who understand edge computing has never been greater. This programme prepares you to lead smart territory initiatives, combining technical expertise with practical cybersecurity skills certified by Stormshield.';
    addWrappedText(whyMatters, margin + 5, y + 22, contentWidth - 10, 5);
    y += 65;
    
    // Key benefits
    doc.setFontSize(11);
    doc.setTextColor(...darkNavy);
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
      doc.setTextColor(...cyan);
      doc.text('*', margin, y);
      doc.setTextColor(75, 85, 99);
      doc.text(benefit, margin + 5, y);
      y += 6;
    });
    
    // ==================== PAGE 3: WHAT IS EDGE COMPUTING ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('What is Edge Computing?', margin + 8, y + 14);
    y += 35;
    
    // Definition box
    doc.setFillColor(...darkNavy);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'normal');
    const edgeDef = 'Edge computing is the practice of processing data closer to where it is generated rather than relying entirely on distant cloud systems. Instead of sending all data to remote data centres, edge computing brings intelligence and processing power to local infrastructure.';
    addWrappedText(edgeDef, margin + 5, y + 12, contentWidth - 10, 5.5);
    
    doc.setTextColor(...cyan);
    doc.setFont('helvetica', 'bold');
    const edgeBenefit = 'This enables faster local decisions, more resilient digital services, and better continuity during internet outages.';
    addWrappedText(edgeBenefit, margin + 5, y + 35, contentWidth - 10, 5.5);
    y += 60;
    
    // Why it matters for towns
    doc.setFontSize(12);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Why Edge Computing Matters for Towns Like Metkovic', margin, y);
    y += 10;
    
    const townBenefits = [
      { title: 'Faster Local Decisions', desc: 'Process critical data on-site without cloud latency' },
      { title: 'Resilient Services', desc: 'Maintain operations when internet connectivity fails' },
      { title: 'Environmental Monitoring', desc: 'Real-time flood, fire, and pollution alerts' },
      { title: 'Emergency Communications', desc: 'Hospital and first responder coordination' },
      { title: 'Traffic Management', desc: 'Local processing of traffic and sound data' },
      { title: 'Media Continuity', desc: 'Local TV and radio broadcasting during outages' },
      { title: 'Municipal Infrastructure', desc: 'Secure hosting for schools and administration' },
      { title: 'Agricultural Applications', desc: 'Smart farming with local data processing' }
    ];
    
    doc.setFontSize(9);
    let col = 0;
    let startY = y;
    townBenefits.forEach((item, index) => {
      const xPos = margin + (col * (contentWidth/2 + 5));
      const yPos = startY + (Math.floor(index/2) * 18);
      
      doc.setFillColor(240, 249, 255);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 15, 2, 2, 'F');
      doc.setTextColor(...darkNavy);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, xPos + 3, yPos + 6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(item.desc, xPos + 3, yPos + 11);
      doc.setFontSize(9);
      
      col = (col + 1) % 2;
    });
    
    // ==================== PAGE 4: WHY METKOVIC ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Why Metkovic?', margin + 8, y + 14);
    y += 30;
    
    // Metkovic intro
    doc.setFillColor(...gold);
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('A Real Territorial Case Study', margin + 5, y + 5.5);
    y += 15;
    
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.setFont('helvetica', 'normal');
    const metkovicIntro = 'Metkovic is a Croatian town situated at the mouth of the Neretva River, near the border with Bosnia and Herzegovina. Its unique geography and strategic position make it an ideal case study for edge computing applications in smart territory management.';
    y = addWrappedText(metkovicIntro, margin, y, contentWidth, 5.5);
    y += 10;
    
    // Challenges grid
    doc.setFontSize(11);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Territorial Challenges & Opportunities', margin, y);
    y += 8;
    
    const challenges = [
      { cat: 'Environmental', items: ['River and flood risk management', 'Water quality monitoring (salinity, acidity)', 'Fire detection and prevention', 'Temperature and humidity tracking'] },
      { cat: 'Infrastructure', items: ['Road traffic management', 'Sound pollution monitoring', 'Public Wi-Fi and geolocation', 'Local hosting for institutions'] },
      { cat: 'Critical Services', items: ['Hospital communications', 'Emergency responder coordination', 'Local TV and radio continuity', 'Municipal administration'] },
      { cat: 'Strategic', items: ['Border-area situational awareness', 'Wildlife and forest observation', 'Agricultural applications', 'Resilient local services'] }
    ];
    
    doc.setFontSize(9);
    challenges.forEach((challenge, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 42);
      
      doc.setFillColor(...darkNavy);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 38, 2, 2, 'F');
      
      doc.setTextColor(...cyan);
      doc.setFont('helvetica', 'bold');
      doc.text(challenge.cat, xPos + 3, yPos + 7);
      
      doc.setTextColor(...white);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      challenge.items.forEach((item, i) => {
        doc.text('* ' + item, xPos + 3, yPos + 14 + (i * 5));
      });
      doc.setFontSize(9);
    });
    
    // ==================== PAGE 5: COURSE HIGHLIGHTS ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Course Highlights', margin + 8, y + 14);
    y += 35;
    
    const highlights = [
      { icon: '3', title: '3-Month Online Programme', desc: 'Comprehensive curriculum delivered entirely online with flexible scheduling' },
      { icon: '1h', title: 'Weekly Live Tutoring', desc: 'One hour of live video tutoring each week with an expert instructor' },
      { icon: 'LAB', title: 'Practical Labs', desc: 'Hands-on laboratory exercises using real-world scenarios and tools' },
      { icon: 'PRJ', title: 'Capstone Project', desc: 'Design a complete resilient edge platform dossier for Metkovic' },
      { icon: 'CERT', title: 'Certificate of Achievement', desc: 'Official certificate from Saint-Georges Academy upon completion' },
      { icon: 'CSNA', title: 'Stormshield Preparation', desc: 'Full preparation for the official Stormshield CSNA certification exam' }
    ];
    
    highlights.forEach((h, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 35);
      
      // Icon circle
      doc.setFillColor(...cyan);
      doc.circle(xPos + 12, yPos + 12, 10, 'F');
      doc.setFontSize(8);
      doc.setTextColor(...white);
      doc.setFont('helvetica', 'bold');
      doc.text(h.icon, xPos + 12, yPos + 14, { align: 'center' });
      
      // Text
      doc.setFontSize(10);
      doc.setTextColor(...darkNavy);
      doc.text(h.title, xPos + 26, yPos + 8);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(h.desc, contentWidth/2 - 35);
      doc.text(descLines, xPos + 26, yPos + 14);
    });
    
    y += 115;
    
    // Official certification box
    doc.setFillColor(...gold);
    doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Official Stormshield CSNA Certification', margin + 5, y + 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Upon completing this programme, you have the option to sit the official Stormshield CSNA', margin + 5, y + 20);
    doc.text('certification exam, validating your expertise in network security and firewall management.', margin + 5, y + 26);
    
    // ==================== PAGE 6: PROGRAMME OVERVIEW ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Programme Overview', margin + 8, y + 14);
    y += 35;
    
    const modules = [
      { num: '01', title: 'Edge Computing Fundamentals', topics: ['Core concepts and architecture', 'Edge vs cloud computing', 'Hardware and software platforms', 'Deployment strategies'] },
      { num: '02', title: 'Smart City Infrastructure', topics: ['IoT sensors and networks', 'Data collection systems', 'Communication protocols', 'Integration patterns'] },
      { num: '03', title: 'Environmental Monitoring', topics: ['Flood and water monitoring', 'Fire detection systems', 'Pollution and air quality', 'Temperature and humidity'] },
      { num: '04', title: 'Critical Services', topics: ['Traffic management', 'Emergency communications', 'Hospital coordination', 'Media continuity'] },
      { num: '05', title: 'Resilient Infrastructure', topics: ['Offline operations', 'Local hosting solutions', 'Redundancy design', 'Disaster recovery'] },
      { num: '06', title: 'Cybersecurity & Stormshield', topics: ['Security architecture', 'Firewall configuration', 'Threat detection', 'CSNA preparation'] }
    ];
    
    modules.forEach((mod, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 42);
      
      doc.setFillColor(240, 249, 255);
      doc.roundedRect(xPos, yPos, contentWidth/2 - 5, 38, 2, 2, 'F');
      
      // Module number
      doc.setFillColor(...darkNavy);
      doc.roundedRect(xPos + 2, yPos + 2, 15, 10, 1, 1, 'F');
      doc.setFontSize(8);
      doc.setTextColor(...cyan);
      doc.setFont('helvetica', 'bold');
      doc.text(mod.num, xPos + 9.5, yPos + 8, { align: 'center' });
      
      // Title
      doc.setFontSize(9);
      doc.setTextColor(...darkNavy);
      doc.text(mod.title, xPos + 20, yPos + 8);
      
      // Topics
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      mod.topics.forEach((topic, i) => {
        doc.text('* ' + topic, xPos + 5, yPos + 16 + (i * 5));
      });
    });
    
    // ==================== PAGE 7: CAPSTONE PROJECT ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Capstone Project', margin + 8, y + 14);
    y += 35;
    
    doc.setFillColor(...darkNavy);
    doc.roundedRect(margin, y, contentWidth, 70, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.text('Design a Resilient Edge Platform for Metkovic', margin + 5, y + 15);
    
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'normal');
    const capstoneDesc = 'As the culmination of your learning journey, you will produce a comprehensive professional project dossier designing a complete resilient edge computing platform tailored to the specific needs of Metkovic.';
    addWrappedText(capstoneDesc, margin + 5, y + 25, contentWidth - 10, 5.5);
    
    doc.setTextColor(...cyan);
    doc.setFontSize(9);
    doc.text('Your dossier will include:', margin + 5, y + 48);
    
    doc.setTextColor(...white);
    const dossierItems = ['Infrastructure architecture', 'Security implementation plan', 'Service deployment strategy', 'Disaster recovery procedures'];
    dossierItems.forEach((item, i) => {
      doc.text('* ' + item, margin + 5 + ((i % 2) * 80), y + 56 + (Math.floor(i/2) * 6));
    });
    y += 85;
    
    // Portfolio value
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Portfolio Value', margin + 5, y + 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('This professional deliverable becomes part of your portfolio, demonstrating your ability to', margin + 5, y + 20);
    doc.text('design and implement real-world smart territory solutions to potential employers or clients.', margin + 5, y + 26);
    
    // ==================== PAGE 8: WHO IS THIS FOR ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Who Is This Course For?', margin + 8, y + 14);
    y += 35;
    
    const audiences = [
      { title: 'Technical Professionals', desc: 'IT administrators, network engineers, and system architects seeking to expand into edge computing and smart city infrastructure.' },
      { title: 'Municipalities & Local Government', desc: 'Technical staff and decision-makers responsible for modernising local digital infrastructure and public services.' },
      { title: 'Cybersecurity Practitioners', desc: 'Security professionals wanting to specialise in protecting critical local infrastructure and gaining Stormshield certification.' },
      { title: 'Institutions & Schools', desc: 'Educational and public institutions looking to develop internal expertise in resilient local hosting and services.' },
      { title: 'Career Changers', desc: 'Adult learners transitioning into technical roles in smart city, IoT, or infrastructure security domains.' },
      { title: 'Consultants & Integrators', desc: 'Independent consultants and system integrators serving municipal and institutional clients.' }
    ];
    
    audiences.forEach((aud, idx) => {
      const yPos = y + (idx * 25);
      doc.setFillColor(idx % 2 === 0 ? [240, 249, 255] : [255, 255, 255]);
      doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(...darkNavy);
      doc.setFont('helvetica', 'bold');
      doc.text(aud.title, margin + 5, yPos + 8);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(aud.desc, contentWidth - 10);
      doc.text(descLines, margin + 5, yPos + 14);
    });
    
    // ==================== PAGE 9: PRICING ====================
    y = addNewPage();
    
    doc.setFillColor(...cyan);
    doc.rect(margin, y, 4, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Investment & Value', margin + 8, y + 14);
    y += 35;
    
    // Price card
    doc.setFillColor(...darkNavy);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(...gray);
    doc.text('Programme Investment', margin + 10, y + 15);
    
    doc.setFontSize(36);
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.text('4 500 EUR', margin + 10, y + 38);
    
    doc.setFontSize(10);
    doc.setTextColor(...cyan);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete 3-month programme', margin + 90, y + 28);
    doc.text('All materials included', margin + 90, y + 36);
    y += 60;
    
    // Value justification
    doc.setFontSize(11);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('What Your Investment Includes', margin, y);
    y += 10;
    
    const valueItems = [
      { title: '12 Hours of Live Expert Tutoring', desc: 'Personal guidance from certified instructors' },
      { title: 'Complete Course Materials', desc: 'All documentation, guides, and resources' },
      { title: 'Practical Laboratory Access', desc: 'Hands-on exercises with real tools' },
      { title: 'Capstone Project Support', desc: 'Guidance for your professional deliverable' },
      { title: 'Certificate of Achievement', desc: 'Official Saint-Georges Academy certification' },
      { title: 'CSNA Exam Preparation', desc: 'Full preparation for Stormshield certification' }
    ];
    
    valueItems.forEach((item, idx) => {
      const xPos = margin + ((idx % 2) * (contentWidth/2 + 5));
      const yPos = y + (Math.floor(idx/2) * 20);
      
      doc.setFillColor(...cyan);
      doc.circle(xPos + 5, yPos + 5, 3, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(...darkNavy);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, xPos + 12, yPos + 4);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(item.desc, xPos + 12, yPos + 10);
    });
    
    y += 70;
    
    // ROI note
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F');
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setTextColor(...darkNavy);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Investment', margin + 5, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('This premium programme represents a serious professional investment in cutting-edge skills,', margin + 5, y + 17);
    doc.text('industry certification, and career advancement in the growing field of smart territories.', margin + 5, y + 22);
    
    // ==================== PAGE 10: CALL TO ACTION ====================
    y = addNewPage();
    
    // Full page CTA
    doc.setFillColor(...darkNavy);
    doc.rect(margin - 10, y - 10, contentWidth + 20, 180, 'F');
    
    doc.setFontSize(24);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.text('Begin Your Journey', pageWidth/2, y + 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
    doc.text('Join the next generation of smart territory professionals', pageWidth/2, y + 45, { align: 'center' });
    
    // CTA buttons
    doc.setFillColor(...cyan);
    doc.roundedRect(pageWidth/2 - 40, y + 60, 80, 15, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLY NOW', pageWidth/2, y + 70, { align: 'center' });
    
    doc.setFillColor(...gold);
    doc.roundedRect(pageWidth/2 - 40, y + 82, 80, 15, 3, 3, 'F');
    doc.setTextColor(...darkNavy);
    doc.text('REQUEST INFO', pageWidth/2, y + 92, { align: 'center' });
    
    // Contact details
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'normal');
    doc.text('Contact Saint-Georges Academy', pageWidth/2, y + 115, { align: 'center' });
    
    doc.setTextColor(...cyan);
    doc.text('contact@saint-georges.academy', pageWidth/2, y + 125, { align: 'center' });
    doc.text('+33 (0)5 49 22 75 10', pageWidth/2, y + 133, { align: 'center' });
    doc.text('www.saint-georges.academy', pageWidth/2, y + 141, { align: 'center' });
    
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.text('2 venelle des Amandiers, 86200 Loudun, France', pageWidth/2, y + 155, { align: 'center' });
    
    // Footer
    doc.setTextColor(...gold);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SAINT-GEORGES ACADEMY', pageWidth/2, y + 170, { align: 'center' });
    doc.setTextColor(...gray);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Cisco Networking Academy | Stormshield Training Partner', pageWidth/2, y + 176, { align: 'center' });
    
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
