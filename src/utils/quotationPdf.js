import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadQuotationPDF = (quotation) => {
    if (!quotation) return;

    const doc = new jsPDF();

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    // =====================================================
    // PAGE MARGINS
    // =====================================================

    const marginLeft = 14;
    const marginRight = 14;

    const contentWidth =
        pageWidth -
        marginLeft -
        marginRight;

    // =====================================================
    // COMPANY INFORMATION
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

    const borderGray = [210, 210, 210];

    const grayText = [80, 80, 80];

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

    // Always round discount amount
    const calculatedDiscountAmount =
        subtotal *
        (discountPercent / 100);

    const discountAmount = Math.round(
        Number(
            quotation?.discountAmount ??
            calculatedDiscountAmount
        )
    );

    // Taxable amount after discount
    const taxableAmount = Math.round(
        subtotal - discountAmount
    );

    // Always round VAT amount
    const calculatedVatAmount =
        taxableAmount *
        (vatPercent / 100);

    const vatAmount = Math.round(
        Number(
            quotation?.vatAmount ??
            calculatedVatAmount
        )
    );

    // Always round grand total
    const calculatedGrandTotal =
        taxableAmount + vatAmount;

    const grandTotal = Math.round(
        Number(
            quotation?.grandTotal ??
            calculatedGrandTotal
        )
    );

    // =====================================================
    // PAGE 1
    // =====================================================

    // =====================================================
    // COMPANY INFORMATION - LEFT
    // =====================================================

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
        marginLeft,
        20
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...grayText
    );

    doc.text(
        companyAddress,
        marginLeft,
        27
    );

    doc.text(
        companyTRN,
        marginLeft,
        33
    );

    doc.text(
        companyEmail,
        marginLeft,
        39
    );

    doc.text(
        companyWebsite,
        marginLeft,
        45
    );

    doc.text(
        companyPhone,
        marginLeft,
        51
    );

    // =====================================================
    // QUOTATION - RIGHT
    // =====================================================

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
        pageWidth - marginRight,
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
        pageWidth - marginRight,
        31,
        {
            align: "right",
        }
    );

    doc.text(
        `Quote Date: ${quotation?.created || "-"}`,
        pageWidth - marginRight,
        38,
        {
            align: "right",
        }
    );

    // =====================================================
    // HORIZONTAL LINE
    // =====================================================

    doc.setDrawColor(
        ...borderGray
    );

    doc.line(
        marginLeft,
        58,
        pageWidth - marginRight,
        58
    );

    // =====================================================
    // BILL TO + SUBJECT
    // =====================================================

    const billToY = 70;

    // =====================================================
    // BILL TO
    // =====================================================

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
        marginLeft,
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
        marginLeft,
        billToY + 8
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...grayText
    );

    doc.text(
        quotation?.phone || "-",
        marginLeft,
        billToY + 15
    );

    doc.text(
        quotation?.email || "-",
        marginLeft,
        billToY + 22
    );

    // =====================================================
    // SUBJECT
    // =====================================================

    const subjectX = 115;

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
        subjectX,
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
        subjectX,
        billToY + 8
    );

    // =====================================================
    // PRODUCT TABLE
    // =====================================================

    const productTableY =
        billToY + 34;

    autoTable(doc, {
        startY: productTableY,

        tableWidth: contentWidth,

        margin: {
            left: marginLeft,
            right: marginRight,
        },

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
        // GENERAL TABLE STYLE
        // =================================================

        styles: {
            fontSize: 8.5,

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
        // HEADER STYLE
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
        // BODY STYLE
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
        // TOTAL = 182mm
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
                halign: "right",
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
                halign: "right",
            },
        },
    });

    // =====================================================
    // SUMMARY SECTION
    // =====================================================

    const summaryY =
        doc.lastAutoTable.finalY + 12;

    // =====================================================
    // PAYMENT TERMS - LEFT
    // =====================================================

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
        marginLeft,
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
        marginLeft,
        summaryY + 8
    );

    // =====================================================
    // NOTES - LEFT
    // =====================================================

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
        marginLeft,
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
        marginLeft,
        notesY + 8
    );

    // =====================================================
    // FINANCIAL SUMMARY - RIGHT
    // =====================================================

    const totalsStartY =
        summaryY - 0;

    // Width of totals table
    const totalsWidth = 92;

    // X position so it stays inside right margin
    const totalsX =
        pageWidth -
        marginRight -
        totalsWidth;
        

    autoTable(doc, {
        startY: totalsStartY,

        tableWidth: totalsWidth,

        margin: {
            left: totalsX,
            right: marginRight,
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

            cellPadding: {
                top: 4,
                bottom: 4,
                left: 2,
                right: 2,
            },

            textColor: black,
        },

        // =================================================
        // TOTALS COLUMN WIDTHS
        // TOTAL = 92mm
        // =================================================

        columnStyles: {
            0: {
                halign: "right",
                fontStyle: "bold",
                cellWidth: 55,
            },

            1: {
                halign: "right",
                cellWidth: 37,
            },
        },

        didParseCell: (data) => {

            // =================================================
            // DISCOUNT
            // =================================================

            if (
                data.row.index === 1 &&
                data.column.index === 1
            ) {
                data.cell.styles.fontStyle =
                    "bold";

                // Normal color
                data.cell.styles.textColor = [
                    60,
                    60,
                    60,
                ];
            }

            // =================================================
            // GRAND TOTAL
            // =================================================

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
            notesY +
            notes.length * 5
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
        marginLeft,
        taxSummaryY
    );

    // =====================================================
    // TAX SUMMARY TABLE
    // =====================================================

    autoTable(doc, {
        startY: taxSummaryY + 5,

        tableWidth: contentWidth,

        margin: {
            left: marginLeft,
            right: marginRight,
        },

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

            cellPadding: {
                top: 4,
                bottom: 4,
                left: 4,
                right: 4,
            },

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

            cellPadding: {
                top: 4,
                bottom: 4,
                left: 4,
                right: 4,
            },
        },

        // =================================================
        // TAX TABLE WIDTHS
        // TOTAL = 182mm
        // =================================================

        columnStyles: {
            0: {
                cellWidth: 75,
                halign: "left",
            },

            1: {
                cellWidth: 55,
                halign: "right",
            },

            2: {
                cellWidth: 52,
                halign: "right",
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
    // PAGE 2
    // TERMS & CONDITIONS
    // =====================================================

    doc.addPage();

    // =====================================================
    // PAGE 2 HEADER
    // =====================================================

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
        marginLeft,
        25
    );

    doc.setDrawColor(
        ...borderGray
    );

    doc.line(
        marginLeft,
        32,
        pageWidth - marginRight,
        32
    );

    // =====================================================
    // QUOTATION REFERENCE
    // =====================================================

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...black
    );

    doc.text(
        `Quotation No: ${
            quotation?.quotationNo ||
            quotation?.id ||
            "-"
        }`,
        marginLeft,
        42
    );

    doc.text(
        `Customer: ${
            quotation?.customer ||
            "-"
        }`,
        pageWidth - marginRight,
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
            marginLeft,
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
                contentWidth
            );

        doc.text(
            lines,
            marginLeft,
            currentY
        );

        currentY +=
            lines.length *
            5 +
            10;
    };

    // =====================================================
    // PAYMENT TERMS
    // =====================================================

    addTerm(
        1,
        "Payment Terms",
        quotation?.paymentTerms ||
        "Payment terms as agreed between the customer and the company."
    );

    // =====================================================
    // COST AND BILL OF QUANTITIES
    // =====================================================

    addTerm(
        2,
        "Cost and Bill of Quantities",
        "The quotation value is based on the products, quantities and pricing specified in this quotation."
    );

    // =====================================================
    // VALIDITY
    // =====================================================

    addTerm(
        3,
        "Quotation Validity",
        "This quotation is subject to the validity period and conditions agreed with the customer."
    );

    // =====================================================
    // TAXES
    // =====================================================

    addTerm(
        4,
        "Taxes",
        `VAT has been calculated at ${vatPercent}% based on the taxable amount after applicable discount.`
    );

    // =====================================================
    // DELIVERY
    // =====================================================

    addTerm(
        5,
        "Delivery",
        "Delivery timelines and arrangements will be confirmed separately based on product availability and the agreed requirements."
    );

    // =====================================================
    // GENERAL
    // =====================================================

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

        doc.setTextColor(
            ...black
        );

        doc.text(
            "Additional Notes",
            marginLeft,
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
                contentWidth
            );

        doc.text(
            additionalNotes,
            marginLeft,
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
        `Quotation-${
            quotation?.quotationNo ||
            quotation?.id ||
            "quotation"
        }.pdf`
    );
};