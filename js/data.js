/* ==========================================================================
   S M Jobaer Alam — Portfolio Data, Catalogs & Templates (js/data.js)
   Website: www.jobaeralam.com
   ========================================================================== */

(function () {
  'use strict';

  var FULL_M365_TEMPLATE = [
    'We are looking for Microsoft 365 Consulting, Configuration & Administration Services covering the following areas:',
    '• Microsoft 365 Setup & Configuration (tenant setup, domain verification, DNS, licensing)',
    '• Microsoft 365 Deployment & Migration (Google Workspace / on-premises Exchange / tenant-to-tenant migration)',
    '• Microsoft Teams Configuration (voice, policies, channels, external access & governance)',
    '• SharePoint & OneDrive Configuration (site architecture, permissions, sharing controls, sync & retention)',
    '• Exchange Online Configuration (mailboxes, mail-flow rules, SPF/DKIM/DMARC, anti-phishing & Defender for Office 365)',
    '• Microsoft Entra ID & Security Configuration (MFA, Conditional Access, PIM, Zero Trust & Intune)',
    '• Microsoft 365 Business Solutions (PowerShell/Graph automation, Purview DLP, compliance & productivity workflows)',
    '• Microsoft 365 Troubleshooting & Support (root-cause resolution, escalations, ongoing administration & SLA support)',
    '',
    'Please share your availability, estimated timeline, and proposed engagement model.'
  ].join('\n');

  window.PORTFOLIO_DATA = {
    EMAIL_CONFIG: {
      web3formsEndpoint: 'https://api.web3forms.com/submit',
      web3formsAccessKey: '5503b99b-47a7-464e-b17e-17a720c74596',
      recipientEmail: 'hello@jobaeralam.com',
      outlookWebCompose: 'https://outlook.cloud.microsoft/mail/deeplink/compose',
      whatsappNumber: '8801712695028'
    },

    FREE_TOOLS_CATALOG: [
      {
        id: 'inventory-management-by-jobaer',
        name: 'Inventory Management by Jobaer',
        version: 'v1.0.0',
        category: 'business',
        categoryLabel: 'Business Apps',
        license: 'Freeware',
        size: 'Enterprise Release (.zip)',
        requirements: 'Windows Server / Windows 10–11 (Background Service) • Linux systemd • Docker • Azure App Service',
        shortDesc: 'Enterprise multi-location inventory, purchasing, sales orders, returns, and invoicing platform with immutable weighted-average ledger, manager approvals, RBAC, and branded PDF/CSV exports.',
        features: [
          'Multi-Location Inventory & Ledger: Tracks on-hand, reserved, and available stock across warehouses and sales centers with receipts, issues, adjustments, cycle counts, transfers, and an immutable moving weighted-average cost ledger.',
          'Purchasing, Sales Orders, Returns & Replenishment: Multi-step PO approvals with partial deliveries, stock-reserving sales orders, customer credit notes, inspected returns-to-warehouse (dispatch/transit/receipt), and one-click reorder PO drafts.',
          'Approvals, RBAC & Security: Manager approval workflows for invoice edits/returns/cancellations, 4 roles (Admin, Manager, Clerk/Sales Agent, Viewer), full audit log, sign-in lockout protection, secure sessions, and CSRF protection.',
          'Branded PDF/CSV Documents & 100K CSV Import: Generates branded POs, order confirmations, packing slips, invoices, and return notes; validates and imports up to 100,000 rows atomically (all-or-nothing) for products, suppliers, customers, and balances.',
          'Cross-Platform Deployment & Admin Tools: Windows background service installer (auto-restart, nightly backups, firewall rule, shortcuts), backup/restore/admin-reset utilities, Linux systemd installer, Docker files, and Azure App Service support.'
        ],
        usage: 'Windows: Run Enterprise-Inventory-Setup.exe (installs background service & nightly backups) | Linux/Docker/Azure: See README.md',
        sha256: 'REPLACE-WITH-REAL-SHA256-FROM-GET-FILEHASH-POWERSHELL',
        fileName: 'Inventory-Management-by-Jobaer-v1.0.0.zip',
        downloadUrl: 'downloads/Inventory-Management-by-Jobaer-v1.0.0.zip',
        isLiveFile: true
      },
      {
        id: 'm365-security-auditor',
        name: 'M365 ESPA By Jobaer',
        version: 'v1.2.0',
        category: 'microsoft365',
        categoryLabel: 'Microsoft 365',
        license: 'Freeware / MIT',
        size: '19.43 KB (.zip)',
        requirements: 'Windows 10/11 • PowerShell 7+ • Microsoft Graph Module',
        shortDesc: 'Automated Microsoft 365 & Entra ID security checklist exporting MFA coverage, Conditional Access gaps, PIM roles, and Exchange SPF/DKIM/DMARC status to HTML/CSV.',
        features: [
          'Audits Entra ID MFA enforcement, legacy authentication, and standing Global Admin accounts.',
          'Checks Exchange Online SPF, DKIM, and DMARC DNS alignment across all accepted domains.',
          'Generates an executive HTML + CSV compliance report ready for ISO 27001 evidence.'
        ],
        usage: 'Connect-MgGraph -Scopes "Directory.Read.All"; .\\Invoke-M365SecurityAudit.ps1 -ExportHtml',
        sha256: '99C67488466D814651411A19398B838DC81B213B199A7C2753C3D232F50B4529',
        fileName: 'M365-Security-Auditor-v1.2.0.zip',
        downloadUrl: 'downloads/M365-Security-Auditor-v1.2.0.zip',
        isLiveFile: true
      },
      {
        id: 'm365-lifecycle-automator',
        name: 'M365 User Onboarding & Offboarding Toolkit',
        version: 'v2.0.1',
        category: 'automation',
        categoryLabel: 'Automation',
        license: 'Freeware / MIT',
        size: '940 KB (.zip)',
        requirements: 'Windows 10/11 • PowerShell 7+ • ExchangeOnlineManagement',
        shortDesc: 'Zero-touch PowerShell & Microsoft Graph automation toolkit for standardized employee onboarding, license assignment, and secure offboarding.',
        features: [
          'Automates Entra ID account creation, M365 group/license assignment, and Teams/SharePoint access.',
          'One-command secure offboarding: revokes active sessions, blocks sign-in, converts mailbox to shared, and exports audit logs.',
          'Supports bulk CSV processing with built-in dry-run (-WhatIf) safety mode.'
        ],
        usage: '.\\Start-M365Lifecycle.ps1 -Action Offboard -UserPrincipalName "user@domain.com" -WhatIf',
        sha256: 'REPLACE-WITH-REAL-SHA256-FROM-GET-FILEHASH-POWERSHELL',
        fileName: 'M365-Lifecycle-Toolkit-v2.0.1.zip',
        downloadUrl: 'downloads/M365-Lifecycle-Toolkit-v2.0.1.zip',
        isLiveFile: true
      },
      {
        id: 'dns-mail-auth-checker',
        name: 'DNS, SPF, DKIM & DMARC Diagnostic Utility',
        version: 'v1.1.0',
        category: 'security',
        categoryLabel: 'Security & Audit',
        license: 'Freeware',
        size: '15.69 KB (.zip)',
        requirements: 'Windows 10/11 • PowerShell 5.1 / 7+',
        shortDesc: 'Lightweight mail-security diagnostic tool that validates MX, SPF lookup limits, DKIM selectors, DMARC policies, and BIMI/MTA-STS records in seconds.',
        features: [
          'Detects SPF 10-DNS-lookup limit errors and syntax mistakes before mail delivery breaks.',
          'Validates Microsoft 365 selector1/selector2 DKIM CNAME records automatically.',
          'Exports clean troubleshooting reports for Exchange Online and client migrations.'
        ],
        usage: '.\\Test-MailAuthDNS.ps1 -Domain "jobaeralam.com" -CheckM365Selectors',
        sha256: '4563C7E80077F0AA6905A16B8F710AA3BD1D83040282CF6266F4797BB2300E3A',
        fileName: 'DNS-MailAuth-Diagnostic-v1.1.0.zip',
        downloadUrl: 'downloads/DNS-MailAuth-Diagnostic-v1.1.0.zip',
        isLiveFile: true
      },
      {
        id: 'windows-sysadmin-toolbox',
        name: 'Windows Endpoint & Network Health Toolbox',
        version: 'v1.4.0',
        category: 'utility',
        categoryLabel: 'Windows Utility',
        license: 'Freeware',
        size: '3.4 MB (.zip)',
        requirements: 'Windows 10 / 11 / Server 2019–2025 (Admin Rights)',
        shortDesc: 'Portable all-in-one IT support utility for checking BitLocker status, Intune/AD join health, network latency, VPN routing, and Windows Update diagnostics.',
        features: [
          'Single-pane diagnostics for dsregcmd /status, BitLocker recovery readiness, and Defender status.',
          'Built-in network latency, DNS resolution, port reachability, and FortiGate/Azure VPN route tester.',
          'Zero installation required—run directly from USB or remote support sessions.'
        ],
        usage: 'Extract ZIP -> Right-click Run-SysAdminToolbox.ps1 -> Run with PowerShell (Admin)',
        sha256: 'REPLACE-WITH-REAL-SHA256-FROM-GET-FILEHASH-POWERSHELL',
        fileName: 'Windows-SysAdmin-Toolbox-v1.4.0.zip',
        downloadUrl: 'downloads/Windows-SysAdmin-Toolbox-v1.4.0.zip',
        isLiveFile: true
      },
      {
        id: 'mrtg-by-jobaer',
        name: 'MRTG by Jobaer',
        version: 'v1.0.0',
        category: 'network',
        categoryLabel: 'Network Tools',
        license: 'Freeware',
        size: '4.2 MB (.zip)',
        requirements: 'Windows 10 / 11 / Server • SNMP v1/v2c Enabled Router or Switch',
        shortDesc: 'Streamlined Multi Router Traffic Grapher (MRTG) deployment & monitoring tool for tracking live router, firewall, and switch interface bandwidth utilization.',
        features: [
          'Quick-setup SNMP polling for FortiGate, MikroTik, Cisco, and enterprise switches/routers.',
          'Generates daily, weekly, monthly, and yearly inbound/outbound traffic graphs automatically.',
          'Lightweight footprint designed for branch WAN links, ISP monitoring, and NOC dashboards.'
        ],
        usage: 'Extract ZIP -> Configure target IP & SNMP community in config.ini -> Run MRTG-by-Jobaer.exe',
        sha256: 'REPLACE-WITH-REAL-SHA256-FROM-GET-FILEHASH-POWERSHELL',
        fileName: 'MRTG-by-Jobaer-v1.0.0.zip',
        downloadUrl: 'downloads/MRTG-by-Jobaer-v1.0.0.zip',
        isLiveFile: true
      },
      {
        id: 'speed-monitoring-du-by-jobaer',
        name: 'Speed Monitoring DU by Jobaer',
        version: 'v1.0.0',
        category: 'network',
        categoryLabel: 'Network Tools',
        license: 'Freeware',
        size: '2.1 MB (.zip)',
        requirements: 'Windows 10 / 11 (64-bit) • Lightweight Taskbar Utility',
        shortDesc: 'Compact, always-visible Windows taskbar utility displaying real-time Download (D:) and Upload (U:) internet speed with minimal CPU and memory usage.',
        features: [
          'Displays live Download (D:) and Upload (U:) throughput directly in the Windows taskbar.',
          'Auto-detects active Ethernet, Wi-Fi, and VPN network adapters with dynamic B/s, KB/s, and MB/s scaling.',
          'Portable and lightweight with optional start-with-Windows support and zero telemetry.'
        ],
        usage: 'Extract ZIP -> Run Speed-Monitoring-DU-by-Jobaer.exe -> Pin or dock to Windows Taskbar',
        sha256: 'REPLACE-WITH-REAL-SHA256-FROM-GET-FILEHASH-POWERSHELL',
        fileName: 'Speed-Monitoring-DU-by-Jobaer-v1.0.0.zip',
        downloadUrl: 'downloads/Speed-Monitoring-DU-by-Jobaer-v1.0.0.zip',
        isLiveFile: true
      }
    ],

    CASE_STUDIES: [
      {
        tag: 'Zero Trust & M365 Security',
        title: 'Zero Trust & Microsoft 365 Security Hardening',
        challenge: 'A distributed multinational organization faced standing Global Administrator exposure, inconsistent email authentication, and siloed endpoint/cloud security alerts across remote teams.',
        solution: 'Architected a Microsoft Zero Trust roadmap using Entra ID Conditional Access, phishing-resistant MFA, Privileged Identity Management (PIM), Exchange Online SPF/DKIM/DMARC enforcement, Intune + BitLocker device compliance, and unified Defender XDR + Microsoft Sentinel SIEM response.',
        impact: [
          'Eliminated standing privileged accounts through just-in-time PIM elevation and approval workflows.',
          'Blocked domain spoofing and reduced phishing exposure with strict SPF, DKIM, and DMARC policies.',
          'Centralized threat detection and incident response playbooks across endpoints, identities, and cloud workloads.'
        ],
        tech: ['Microsoft Entra ID', 'Conditional Access & PIM', 'Exchange Online', 'Defender XDR', 'Microsoft Sentinel', 'Intune & BitLocker']
      },
      {
        tag: 'Multi-Site Infrastructure',
        title: '37-Branch Multi-Site Infrastructure & WAN Modernization',
        challenge: 'Managing 37 nationwide telecom branch offices with fragmented local servers, inconsistent VPN connectivity, manual patching, and high multi-site troubleshooting overhead.',
        solution: 'Standardized Active Directory, DNS, DHCP, and Group Policy across all 37 locations; consolidated workloads on Hyper-V and VMware clusters; engineered redundant FortiGate site-to-site VPNs and branch WAN links; and unified corporate IP PABX/VoIP communications.',
        impact: [
          'Delivered unified identity, policy enforcement, and reliable WAN/VPN uptime across all 37 branch locations.',
          'Reduced manual server administration through PowerShell and Bash automation scripts.',
          'Established repeatable ITIL incident, change, and disaster-recovery testing practices.'
        ],
        tech: ['Windows Server & AD', 'Hyper-V & VMware', 'FortiGate & Site-to-Site VPN', 'Branch WAN / VLANs', 'IP PABX / VoIP', 'PowerShell & Bash']
      },
      {
        tag: 'Cloud & FinOps',
        title: 'Hybrid Azure/AWS Cloud Migration & Cost Optimization',
        challenge: 'Legacy on-premises workloads required high-availability cloud migration without runaway monthly Azure/AWS consumption or gaps in perimeter security and disaster recovery.',
        solution: 'Executed phased migrations to Azure VMs and App Services protected by Azure Firewall, VNet segmentation, and automated Backup/DR vaults while establishing FinOps tagging, right-sizing, and license/resource governance across Azure and AWS.',
        impact: [
          'Completed production migrations with minimal user disruption and verified backup/DR restore points.',
          'Eliminated idle compute/storage waste and improved monthly cloud spend visibility across Azure and AWS.',
          'Hardened hybrid cloud ingress/egress with Azure Firewall and documented architectural SOPs.'
        ],
        tech: ['Microsoft Azure', 'Azure Firewall & VNet', 'Azure Backup & DR', 'App Services (CI/CD)', 'AWS Cost Control', 'Hybrid Cloud']
      },
      {
        tag: 'Compliance & Automation',
        title: 'ISO 27001 & Purview DLP Compliance Automation',
        challenge: 'Manual user onboarding/offboarding, ad-hoc license tracking, and scattered audit evidence created compliance drift and slowed down ISO 27001 readiness reviews.',
        solution: 'Implemented Microsoft Purview DLP, sensitivity classification, encryption, and retention controls alongside Entra ID access reviews, risk registers, and PowerShell/Microsoft Graph scripts automating user lifecycle and executive compliance reporting.',
        impact: [
          'Achieved audit-ready ISO 27001 documentation, asset inventories, and quarterly access-review evidence.',
          'Cut manual onboarding/offboarding and license auditing effort dramatically via PowerShell & Graph automation.',
          'Prevented unauthorized external data sharing across SharePoint, Teams, OneDrive, and Exchange Online.'
        ],
        tech: ['ISO 27001 Controls', 'Microsoft Purview DLP', 'PowerShell', 'Microsoft Graph API', 'Exchange Online PS', 'Access Reviews']
      }
    ],

    INQUIRY_SUGGESTIONS: {
      'US Full-Time Remote Job Opportunity': {
        placeholder: 'Describe the US remote role, tech stack (M365/Azure/Security), time zone (ET/CT/PT), and target start date...',
        prompts: [
          { label: 'Senior M365 & Entra ID Engineer (US Remote)', text: 'We are hiring a Senior Microsoft 365 & Entra ID Engineer (US Remote) to lead Zero Trust security, Conditional Access, PIM, and Intune endpoint governance. Please share your availability this week for a technical interview.' },
          { label: 'Cloud Security Architect (Defender XDR & Sentinel)', text: 'We have a US Remote opening for a Microsoft Security Architect focused on Defender XDR, Microsoft Sentinel SIEM, Purview DLP, and ISO 27001 controls. Would love to discuss the role and compensation.' },
          { label: 'Azure Hybrid & Infrastructure Engineer', text: 'Seeking an experienced US Remote Azure & Hybrid Infrastructure Engineer to oversee migrations, Windows Server/AD hybrid operations, and PowerShell/Microsoft Graph automation.' }
        ]
      },
      'US On-Premises / Relocation Role': {
        placeholder: 'Share the US office location, on-premises/hybrid schedule, relocation/sponsorship support, and core scope...',
        prompts: [
          { label: 'On-Site / Hybrid Cloud & Security Architect', text: 'We are recruiting for a US On-Site / Hybrid Cloud & Security Architect (relocation support available) to lead Microsoft 365, Azure Firewall, and Zero Trust initiatives. Let us schedule an introductory call.' },
          { label: 'Enterprise IT Infrastructure Manager', text: 'Looking for an Enterprise IT Infrastructure Manager (US On-Premises / Hybrid) to lead multi-site Windows Server, Active Directory, Hyper-V/VMware, and Azure Hybrid operations.' },
          { label: 'Microsoft SecOps Lead (Defender & Sentinel)', text: 'We have a US On-Premises / Hybrid Microsoft Security Operations Lead role managing Defender XDR, Sentinel incident response, vulnerability management, and ISO 27001 audits.' }
        ]
      },
      'Freelance Project (Upwork / Fiverr / Direct)': {
        placeholder: 'Outline deliverables, preferred platform (Upwork/Fiverr/Direct), approximate user/device count, and deadline...',
        prompts: [
          { label: 'Exchange Online & SPF/DKIM/DMARC Hardening', text: 'We need a freelance specialist to audit and harden Exchange Online mail flow, configure strict SPF/DKIM/DMARC DNS records, and resolve email spoofing issues within 1–2 weeks.' },
          { label: 'Intune MDM, BitLocker & Defender Rollout', text: 'Looking to hire you for a fixed-scope project to deploy Microsoft Intune MDM, BitLocker encryption, and Defender for Endpoint across our Windows fleet (50–500 devices) with SOP documentation.' },
          { label: 'PowerShell & Graph Lifecycle Automation', text: 'We want to automate user onboarding, offboarding, mailbox conversion, and M365 license reporting using PowerShell and Microsoft Graph API. Please share your estimate and preferred platform.' }
        ]
      },
      'Microsoft 365 Consulting': {
        placeholder: 'Select a Microsoft 365 consulting/configuration prompt above or describe your tenant size, migration/security goals, and timeline...',
        prompts: [
          { label: '★ Full M365 Configuration & Administration Suite', featured: true, text: FULL_M365_TEMPLATE },
          { label: 'M365 Setup, Deployment & Migration', text: 'We need Microsoft 365 consulting assistance with:\n• Microsoft 365 Setup & Configuration (tenant setup, domain verification, DNS, licensing)\n• Microsoft 365 Deployment & Migration (Google Workspace / on-premises Exchange / tenant-to-tenant migration)\n\nPlease share your migration approach, downtime minimization plan, and timeline.' },
          { label: 'Teams, SharePoint & OneDrive Config', text: 'We need Microsoft 365 consulting assistance with:\n• Microsoft Teams Configuration (voice, policies, channels, external access & governance)\n• SharePoint & OneDrive Configuration (site architecture, permissions, sharing controls, sync & retention)\n\nPlease share your availability for a scoping call.' },
          { label: 'Exchange Online & Mail Flow Optimization', text: 'We are looking for a Microsoft 365 consultant to configure and optimize Exchange Online mailboxes, mail-flow rules, SPF/DKIM/DMARC authentication, anti-phishing policies, and Defender for Office 365 protection.' },
          { label: 'Entra ID, Zero Trust & Tenant Security Audit', text: 'We need a Microsoft 365 consulting engagement to conduct a Tenant Security & Zero Trust Audit, configure Microsoft Entra ID (MFA, Conditional Access, PIM, Intune), optimize licenses, and close compliance gaps.' },
          { label: 'M365 Governance, Business Solutions & Support', text: 'We need Microsoft 365 consulting assistance with:\n• Microsoft 365 Business Solutions (PowerShell/Graph automation, Purview DLP, sensitivity labels & Copilot readiness)\n• Microsoft 365 Troubleshooting & Support (root-cause resolution, escalations, ongoing administration & SLA support)\n\nPlease share your project or ongoing support engagement options.' }
        ]
      },
      'Enterprise Cloud / Security Consulting': {
        placeholder: 'Share your current cloud/security posture, compliance targets (ISO 27001/Zero Trust), and key priorities...',
        prompts: [
          { label: 'Zero Trust Architecture Assessment', text: 'We are seeking an executive Zero Trust assessment covering Microsoft Entra ID, Conditional Access, PIM, and Defender XDR to close security gaps and build a clear remediation roadmap.' },
          { label: 'ISO 27001 Readiness & Purview DLP', text: 'Our organization is preparing for an ISO 27001 audit and needs consulting support for access reviews, risk registers, Microsoft Purview DLP policies, and audit evidence documentation.' },
          { label: 'Azure/AWS FinOps, DR & FortiGate VPN', text: 'We need consulting assistance to optimize monthly Azure and AWS cloud spend, strengthen backup/DR plans, and modernize our multi-site FortiGate and Azure Firewall VPN architecture.' }
        ]
      }
    },

    ATS_PLAIN_TEXT_RESUME: [
      'S M JOBAER ALAM',
      'MICROSOFT 365 & CLOUD ENGINEER | MICROSOFT SECURITY SPECIALIST',
      'Web: www.jobaeralam.com | Email: hello@jobaeralam.com | WhatsApp/Mobile: +880 1712695028',
      'LinkedIn: www.linkedin.com/in/smjobaeralam | Location: Dhaka, Bangladesh (US Remote / On-Premises & Global Freelance)',
      '',
      'PROFESSIONAL SUMMARY',
      'Microsoft infrastructure, cloud, and security professional with 16+ years of experience administering, securing, and supporting enterprise IT environments, including multinational and multi-site operations across 37 branch locations. Hands-on expertise spans Microsoft 365, Microsoft Entra ID, Exchange Online, SharePoint, Teams, OneDrive, Azure infrastructure, Windows Server, Active Directory, enterprise networking, and security operations. Experienced with Conditional Access, MFA, PIM, Microsoft Defender XDR, Microsoft Sentinel, Intune, Purview DLP, Azure Firewall, FortiGate, ISO 27001 controls, backup and recovery, and PowerShell automation.',
      '',
      'CORE TECHNICAL SKILLS',
      '- Microsoft 365 & Collaboration: M365 tenant administration, Exchange Online, mailboxes & mail flow, SPF/DKIM/DMARC, SharePoint Online, Teams, OneDrive, licensing, permissions.',
      '- Identity & Access: Microsoft Entra ID (Azure AD), user/group lifecycle, MFA, Conditional Access, Privileged Identity Management (PIM), access reviews, Active Directory, Group Policy.',
      '- Azure & Cloud Engineering: Azure resources & VMs, Azure networking, Azure Firewall, backup & recovery, cloud migrations, App Services (CI/CD), Azure & AWS cost control.',
      '- Cybersecurity & Compliance: Microsoft Defender XDR, Defender for Endpoint/Cloud, Microsoft Sentinel, vulnerability management, Intune, BitLocker, Purview DLP, ISO 27001 controls, security audits & incident response.',
      '- Windows & Virtualization: Windows Server Hybrid, DNS, DHCP, Hyper-V, VMware, server migrations & upgrades, storage & compute administration.',
      '- Networking & Communications: FortiGate, Azure Firewall, site-to-site & client VPN, LAN/WAN, VLANs, routers, Layer 2/3 switches, Wi-Fi, IP PABX, IP phones, VoIP.',
      '- Automation & Operations: PowerShell, Microsoft Graph, Exchange Online PowerShell, Bash, onboarding/offboarding automation, ITIL service desk, incident/problem/change management, SOPs & documentation.',
      '',
      'PROFESSIONAL EXPERIENCE',
      'Project Manager (Consultant) — IT Systems Administration, Microsoft 365, Azure & Security | Comba Telecom Limited, Hong Kong (Jun 2023 – Present)',
      '- Administer Microsoft 365 & Entra ID (Conditional Access, MFA, PIM), Exchange Online (SPF/DKIM/DMARC), and SharePoint/Teams/OneDrive governance.',
      '- Manage Azure VMs, backup/DR, cloud migrations, Azure/AWS cost control, and FortiGate / Azure Firewall VPNs.',
      '- Lead endpoint security (Intune, BitLocker, Defender for Endpoint), Defender XDR & Sentinel incident response, ISO 27001 controls, Purview DLP, and PowerShell/Graph automation.',
      '',
      'IT Manager | MobiTeam Bangladesh Ltd., Dhaka (Mar 2018 – May 2023)',
      '- Managed servers, networks, firewalls, cloud services, domains/DNS, official email, ISO 27001 policies, DR/BCP plans, ERP/CRM/HR/Accounts integration, and vendor contracts.',
      '',
      'Senior System Administrator | Orasinvest Bangladesh Ltd., Dhaka (37 Branch Locations) (Mar 2012 – May 2018)',
      '- Administered enterprise IT across 37 nationwide telecom branches: Windows Server, Linux, AD/DNS/DHCP/GPO, Hyper-V/VMware, M365/Exchange, FortiGate VPNs, branch WANs, IP PABX, ITIL operations, and PowerShell/Bash automation.',
      '',
      'IT Support Engineer | Computer Recherche Center & RNKASS Ltd., Dhaka (Apr 2010 – Mar 2012)',
      '- Installed and supported LAN, Wi-Fi, VLAN switches, VPN routers, PABX/IP phones, IP cameras/NVR, access control, and file/print servers.',
      '',
      'CERTIFICATIONS',
      '- Microsoft 365 Certified: Cybersecurity Architect Expert (SC-300, SC-200, SC-100) — 2026',
      '- Microsoft 365 Certified: Enterprise Administrator Expert (MS-102) — 2026',
      '- AWS Certified Solutions Architect — 2026',
      '- Microsoft Certified: Azure Solutions Architect Expert — 2025',
      '- Microsoft Certified: Azure Administrator Associate (AZ-104) — 2025',
      '- Microsoft Certified: Windows Server Hybrid Administrator Associate — 2025',
      '- MCSE: Exchange Server 2016; Windows Server 2016 Administrator Associate; MCP — 2017–2018',
      '',
      'EDUCATION & LANGUAGES',
      '- BSc in Computer Science — University of South Asia, Dhaka',
      '- Diploma in Engineering (CSE) — Patuakhali Polytechnic Institute, Bangladesh',
      '- Languages: English (C1 Fluent), Bangla (Native), Hindi (B1)',
      '- References available upon request.'
    ].join('\n')
  };
})();
