import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadQuotationPDF = (quotation) => {
    if (!quotation) return;

    const doc = new jsPDF();

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    const marginLeft = 14;
    const marginRight = 14;

    const contentWidth =
        pageWidth - marginLeft - marginRight;

    // =====================================================
    // COMPANY INFORMATION
    // =====================================================
    // Change these values according to your company.
    // =====================================================

    const companyName = "YOUR COMPANY";
    const companyAddress = "Company Address";
    const companyTRN = "TRN No: 100000000000003";
    const companyEmail = "info@company.ae";
    const companyWebsite = "www.company.ae";
    const companyPhone = "+971 4 000 0000";

    // =====================================================
    // COLORS
    // =====================================================

    const darkGray = [60, 60, 60];

    const black = [0, 0, 0];

    const lightGray = [245, 245, 245];

    const borderGray = [210, 210, 210];

    // =====================================================
    // HELPER
    // =====================================================

    const formatAED = (value) => {
        return `AED ${Math.round(
            Number(value || 0)
        ).toLocaleString()}`;
    };

    // =====================================================
    // CALCULATE TOTALS
    // =====================================================

    const subtotal = Math.round(
        Number(
            quotation?.quotationValue || 0
        )
    );

    const discountPercent = Number(
        quotation?.discount || 0
    );

    const vatPercent = Number(
        quotation?.vat || 0
    );

    const discountAmount = Math.round(
        Number(
            quotation?.discountAmount ||
            subtotal *
            (discountPercent / 100)
        )
    );

    const taxableAmount =
        subtotal - discountAmount;

    const vatAmount = Math.round(
        Number(
            quotation?.vatAmount ||
            taxableAmount *
            (vatPercent / 100)
        )
    );

    const grandTotal = Math.round(
        Number(
            quotation?.grandTotal ||
            taxableAmount + vatAmount
        )
    );

    // =====================================================
    // PAGE 1
    // =====================================================

    // -----------------------------------------------------
    // Company Information - Left
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(16);

    doc.setTextColor(
        ...black
    );

    doc.text(
        companyName,
        14,
        20
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        80,
        80,
        80
    );

    doc.text(
        companyAddress,
        14,
        27
    );

    doc.text(
        companyTRN,
        14,
        33
    );

    doc.text(
        companyEmail,
        14,
        39
    );

    doc.text(
        companyWebsite,
        14,
        45
    );

    doc.text(
        companyPhone,
        14,
        51
    );

    // -----------------------------------------------------
    // QUOTATION - Right
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(22);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "QUOTATION",
        pageWidth - 14,
        22,
        {
            align: "right",
        }
    );

    doc.setFontSize(10);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setTextColor(
        ...black
    );

    doc.text(
        `# ${quotation?.quotationNo || quotation?.id || "-"}`,
        pageWidth - 14,
        31,
        {
            align: "right",
        }
    );

    doc.text(
        `Quote Date: ${quotation?.created || "-"}`,
        pageWidth - 14,
        38,
        {
            align: "right",
        }
    );

    // -----------------------------------------------------
    // Horizontal Line
    // -----------------------------------------------------

    doc.setDrawColor(
        ...borderGray
    );

    doc.line(
        14,
        58,
        pageWidth - 14,
        58
    );

    // =====================================================
    // BILL TO + SUBJECT
    // =====================================================

    const billToY = 70;

    // -----------------------------------------------------
    // Bill To
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "Bill To",
        14,
        billToY
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
        ...black
    );

    doc.text(
        quotation?.customer || "-",
        14,
        billToY + 8
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        80,
        80,
        80
    );

    doc.text(
        quotation?.phone || "-",
        14,
        billToY + 15
    );

    doc.text(
        quotation?.email || "-",
        14,
        billToY + 22
    );

    // -----------------------------------------------------
    // Subject
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "Subject",
        115,
        billToY
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...black
    );

    const subject =
        quotation?.notes ||
        "Quotation for requested products/services.";

    const subjectLines =
        doc.splitTextToSize(
            subject,
            80
        );

    doc.text(
        subjectLines,
        115,
        billToY + 8
    );

    // =====================================================
    // PRODUCT TABLE
    // =====================================================

    const productTableY =
        billToY + 34;

    autoTable(doc, {
        startY: productTableY,

        head: [
            [
                "#",
                "Item & Description",
                "Qty",
                "Rate",
                "Discount",
                "Tax",
                "Amount",
            ],
        ],

        body: [
            [
                "1",

                quotation?.productName ||
                "-",

                quotation?.quantity ||
                "0",

                Math.round(
                    Number(
                        quotation?.unitPrice || 0
                    )
                ).toLocaleString(),

                `${discountPercent}%`,

                `${vatPercent}%`,

                Math.round(
                    Number(
                        quotation?.quotationValue ||
                        0
                    )
                ).toLocaleString(),
            ],
        ],

        theme: "grid",

        // =================================================
        // REDUCED ROW HEIGHT / SPACING
        // =================================================

        styles: {
            fontSize: 8.5,

            // Reduced from 5
            cellPadding: {
                top: 2.5,
                bottom: 2.5,
                left: 3,
                right: 3,
            },

            valign: "middle",

            textColor: black,

            lineColor: borderGray,

            lineWidth: 0.2,
        },

        // =================================================
        // HEADER
        // =================================================

        headStyles: {
            fillColor: darkGray,

            textColor: [
                255,
                255,
                255,
            ],

            fontStyle: "bold",

            fontSize: 8.5,

            // Smaller header padding
            cellPadding: {
                top: 2.5,
                bottom: 2.5,
                left: 3,
                right: 3,
            },

            halign: "center",

            valign: "middle",
        },

        // =================================================
        // BODY
        // =================================================

        bodyStyles: {
            fontSize: 8.5,

            cellPadding: {
                top: 2,
                bottom: 2,
                left: 3,
                right: 3,
            },

            valign: "middle",
        },

        // =================================================
        // COLUMN WIDTHS
        // =================================================

        columnStyles: {
            // #
            0: {
                cellWidth: 8,
                halign: "center",
            },

            // Item & Description
            1: {
                cellWidth: 58,
                halign: "left",
            },

            // Qty
            2: {
                cellWidth: 13,
                halign: "center",
            },

            // Rate
            3: {
                cellWidth: 25,
                halign: "center",
            },

            // Discount
            4: {
                cellWidth: 22,
                halign: "center",
            },

            // Tax
            5: {
                cellWidth: 18,
                halign: "center",
            },

            // Amount
            6: {
                cellWidth: 38,
                halign: "center",
            },
        },
    });

    // =====================================================
    // SUMMARY SECTION
    // =====================================================

    const summaryY =
        doc.lastAutoTable.finalY + 12;

    // -----------------------------------------------------
    // Payment Terms
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "Payment Terms",
        14,
        summaryY
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...black
    );

    const paymentTerms =
        doc.splitTextToSize(
            quotation?.paymentTerms ||
            "-",
            75
        );

    doc.text(
        paymentTerms,
        14,
        summaryY + 8
    );

    // -----------------------------------------------------
    // Notes
    // -----------------------------------------------------

    const notesY =
        summaryY +
        8 +
        paymentTerms.length * 5 +
        10;

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "Notes",
        14,
        notesY
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...black
    );

    const notes =
        doc.splitTextToSize(
            quotation?.notes || "-",
            75
        );

    doc.text(
        notes,
        14,
        notesY + 8
    );

    // =====================================================
    // FINANCIAL SUMMARY
    // =====================================================

    const totalsStartY =
        summaryY - 6;

    autoTable(doc, {
        startY: totalsStartY,

        margin: {
            left: 105,
            right: 14,
        },

        body: [
            [
                "Sub Total",
                formatAED(subtotal),
            ],

            [
                `Discount (${discountPercent}%)`,
                `-AED ${discountAmount.toLocaleString()}`,
            ],

            [
                `VAT (${vatPercent}%)`,
                formatAED(vatAmount),
            ],

            [
                "TOTAL",
                formatAED(grandTotal),
            ],
        ],

        theme: "plain",

        styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: black,
        },

        columnStyles: {
            0: {
                halign: "right",
                fontStyle: "bold",
                cellWidth: 55,
            },

            1: {
                halign: "right",
                cellWidth: 45,
            },
        },

        didParseCell: (data) => {

            // -------------------------------
            // Discount
            // -------------------------------

            if (
                data.row.index === 1 &&
                data.column.index === 1
            ) {
                data.cell.styles.fontStyle =
                    "bold";

                // Normal dark color
                data.cell.styles.textColor = [
                    60,
                    60,
                    60,
                ];
            }

            // -------------------------------
            // Grand Total
            // -------------------------------

            if (
                data.row.index === 3
            ) {
                data.cell.styles.fontStyle =
                    "bold";

                data.cell.styles.fontSize =
                    11;

                data.cell.styles.textColor =
                    black;
            }
        },
    });

    // =====================================================
    // TAX SUMMARY
    // =====================================================

    const taxSummaryY =
        Math.max(
            doc.lastAutoTable.finalY,
            notesY + notes.length * 5
        ) + 14;

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "Tax Summary",
        14,
        taxSummaryY
    );

    autoTable(doc, {
        startY: taxSummaryY + 5,

        head: [
            [
                "Tax Details",
                "Taxable Amount",
                "Tax Amount",
            ],
        ],

        body: [
            [
                `Standard Rate (${vatPercent}%)`,

                formatAED(
                    taxableAmount
                ),

                formatAED(
                    vatAmount
                ),
            ],
        ],

        theme: "grid",

        styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: black,
            lineColor: borderGray,
            lineWidth: 0.2,
        },

        headStyles: {
            fillColor: darkGray,
            textColor: [
                255,
                255,
                255,
            ],
            fontStyle: "bold",
        },

        columnStyles: {
            0: {
                cellWidth: 75,
            },

            1: {
                cellWidth: 55,
                // halign: "center",
            },

            2: {
                cellWidth: 55,
                // halign: "center",
            },
        },
    });

    // =====================================================
    // PAGE 1 FOOTER
    // =====================================================

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(8);

    doc.setTextColor(
        120,
        120,
        120
    );

    doc.text(
        "This is a system-generated quotation.",
        pageWidth / 2,
        pageHeight - 10,
        {
            align: "center",
        }
    );

    // =====================================================
    // PAGE 2 - TERMS & CONDITIONS
    // =====================================================

    doc.addPage();

    // -----------------------------------------------------
    // Page 2 Header
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(20);

    doc.setTextColor(
        ...darkGray
    );

    doc.text(
        "TERMS & CONDITIONS",
        14,
        25
    );

    doc.setDrawColor(
        ...borderGray
    );

    doc.line(
        14,
        32,
        pageWidth - 14,
        32
    );

    // -----------------------------------------------------
    // Quotation Reference
    // -----------------------------------------------------

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...black
    );

    doc.text(
        `Quotation No: ${quotation?.quotationNo ||
        quotation?.id ||
        "-"
        }`,
        14,
        42
    );

    doc.text(
        `Customer: ${quotation?.customer || "-"
        }`,
        pageWidth - 14,
        42,
        {
            align: "right",
        }
    );

    // =====================================================
    // TERMS
    // =====================================================

    let currentY = 58;

    const addTerm = (
        number,
        title,
        description
    ) => {
        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(10);

        doc.setTextColor(
            ...black
        );

        doc.text(
            `${number}. ${title}`,
            14,
            currentY
        );

        currentY += 7;

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(9);

        const lines =
            doc.splitTextToSize(
                description,
                pageWidth - 28
            );

        doc.text(
            lines,
            14,
            currentY
        );

        currentY +=
            lines.length * 5 + 10;
    };

    // -----------------------------------------------------
    // Payment Terms
    // -----------------------------------------------------

    addTerm(
        1,
        "Payment Terms",
        quotation?.paymentTerms ||
        "Payment terms as agreed between the customer and the company."
    );

    // -----------------------------------------------------
    // Cost and Bill of Quantities
    // -----------------------------------------------------

    addTerm(
        2,
        "Cost and Bill of Quantities",
        "The quotation value is based on the products, quantities and pricing specified in this quotation."
    );

    // -----------------------------------------------------
    // Validity
    // -----------------------------------------------------

    addTerm(
        3,
        "Quotation Validity",
        "This quotation is subject to the validity period and conditions agreed with the customer."
    );

    // -----------------------------------------------------
    // Taxes
    // -----------------------------------------------------

    addTerm(
        4,
        "Taxes",
        `VAT has been calculated at ${vatPercent}% based on the taxable amount after applicable discount.`
    );

    // -----------------------------------------------------
    // Delivery
    // -----------------------------------------------------

    addTerm(
        5,
        "Delivery",
        "Delivery timelines and arrangements will be confirmed separately based on product availability and the agreed requirements."
    );

    // -----------------------------------------------------
    // General
    // -----------------------------------------------------

    addTerm(
        6,
        "General",
        "Any changes to the products, quantities, pricing or requirements may result in a revised quotation."
    );

    // =====================================================
    // CUSTOMER NOTES
    // =====================================================

    if (
        quotation?.notes
    ) {
        currentY += 5;

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(11);

        doc.text(
            "Additional Notes",
            14,
            currentY
        );

        currentY += 8;

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(9);

        const additionalNotes =
            doc.splitTextToSize(
                quotation.notes,
                pageWidth - 28
            );

        doc.text(
            additionalNotes,
            14,
            currentY
        );
    }

    // =====================================================
    // PAGE 2 FOOTER
    // =====================================================

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(8);

    doc.setTextColor(
        120,
        120,
        120
    );

    doc.text(
        "This is a system-generated quotation.",
        pageWidth / 2,
        pageHeight - 10,
        {
            align: "center",
        }
    );

    // =====================================================
    // DOWNLOAD
    // =====================================================

    doc.save(
        `Quotation-${quotation?.quotationNo ||
        quotation?.id ||
        "quotation"
        }.pdf`
    );
};