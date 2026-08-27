import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadQuotationPDF = (quotation) => {
    if (!quotation) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // =========================
    // Header
    // =========================

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
        "QUOTATION",
        pageWidth / 2,
        20,
        {
            align: "center",
        }
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
        `Quotation No: ${quotation?.quotationNo || "-"}`,
        14,
        32
    );

    doc.text(
        `Date: ${quotation?.created || "-"}`,
        pageWidth - 14,
        32,
        {
            align: "right",
        }
    );

    // =========================
    // Customer Information
    // =========================

    autoTable(doc, {
        startY: 42,

        head: [
            [
                "Customer Information",
                "",
            ],
        ],

        body: [
            [
                "Customer / Company",
                quotation?.customer || "-",
            ],
            [
                "Phone",
                quotation?.phone || "-",
            ],
            [
                "Email",
                quotation?.email || "-",
            ],
            [
                "Industry",
                quotation?.industry || "-",
            ],
            [
                "Prepared By",
                quotation?.owner || "-",
            ],
        ],

        theme: "grid",

        styles: {
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fillColor: [60, 60, 60],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },

        columnStyles: {
            0: {
                fontStyle: "bold",
                cellWidth: 55,
            },

            1: {
                cellWidth: 125,
            },
        },
    });

    // =========================
    // Product Information
    // =========================

    const productStartY =
        doc.lastAutoTable.finalY + 10;

    autoTable(doc, {
        startY: productStartY,

        head: [[
            "Product",
            "Unit Price (AED)",
            "Qty",
            "Discount",
            "VAT",
            "Subtotal (AED)",
        ]],

        body: [
            [
                quotation?.productName || "-",

                Math.round(
                    Number(
                        quotation?.unitPrice || 0
                    )
                ).toLocaleString(),

                quotation?.quantity || "0",

                `${quotation?.discount || 0}%`,

                `${quotation?.vat || 0}%`,

                Math.round(
                    Number(
                        quotation?.quotationValue || 0
                    )
                ).toLocaleString(),
            ],
        ],

        theme: "grid",

        styles: {
            fontSize: 9,
            cellPadding: 4,
            valign: "middle",
        },

        headStyles: {
            fillColor: [60, 60, 60],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },

        columnStyles: {
            0: {
                cellWidth: 55,
            },

            1: {
                halign: "right",
                cellWidth: 35,
            },

            2: {
                halign: "center",
                cellWidth: 18,
            },

            3: {
                halign: "center",
                cellWidth: 22,
            },

            4: {
                halign: "center",
                cellWidth: 18,
            },

            5: {
                halign: "right",
                cellWidth: 42,
            },
        },
    });

    // =========================
// Payment Terms + Notes + Totals
// =========================

const summaryStartY =
    doc.lastAutoTable.finalY + 10;

const subtotal = Math.round(
    Number(quotation?.quotationValue || 0)
);

const discountAmount = Math.round(
    Number(quotation?.discountAmount || 0)
);

const vatAmount = Math.round(
    Number(quotation?.vatAmount || 0)
);

const grandTotal = Math.round(
    Number(quotation?.grandTotal || 0)
);

// =========================
// Payment Terms & Notes
// =========================

doc.setFontSize(11);
doc.setFont("helvetica", "bold");

doc.text(
    "Payment Terms",
    14,
    summaryStartY
);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");

const paymentTerms = doc.splitTextToSize(
    quotation?.paymentTerms || "-",
    75
);

doc.text(
    paymentTerms,
    14,
    summaryStartY + 7
);

// =========================
// Notes
// =========================

const notesTitleY =
    summaryStartY +
    7 +
    paymentTerms.length * 5 +
    8;

doc.setFontSize(11);
doc.setFont("helvetica", "bold");

doc.text(
    "Notes",
    14,
    notesTitleY
);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");

const notes = doc.splitTextToSize(
    quotation?.notes || "-",
    75
);

doc.text(
    notes,
    14,
    notesTitleY + 7
);

// =========================
// Totals
// =========================

autoTable(doc, {
    startY: summaryStartY - 5,

    margin: {
        left: 105,
        right: 14,
    },

    body: [
        [
            "Subtotal",
            `AED ${subtotal.toLocaleString()}`,
        ],

        [
            `Discount (${quotation?.discount || 0}%)`,
            `-(AED ${discountAmount.toLocaleString()})`,
        ],

        [
            `VAT (${quotation?.vat || 0}%)`,
            `+ AED ${vatAmount.toLocaleString()}`,
        ],

        [
            "Grand Total",
            `AED ${grandTotal.toLocaleString()}`,
        ],
    ],

    theme: "plain",

    styles: {
        fontSize: 10,
        cellPadding: 4,
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

        // =========================
        // Discount → Red
        // =========================

        // if (
        //     data.row.index === 1 &&
        //     data.column.index === 1
        // ) {
        //     data.cell.styles.textColor = [
        //         220,
        //         53,
        //         69,
        //     ];

        //     data.cell.styles.fontStyle =
        //         "bold";
        // }

        // =========================
        // Grand Total
        // =========================

        if (
            data.row.index === 3
        ) {
            data.cell.styles.fontStyle =
                "bold";

            data.cell.styles.fontSize =
                12;
        }
    },
});

    // =========================
    // Footer
    // =========================

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    doc.text(
        "This is a system-generated quotation.",
        pageWidth / 2,
        pageHeight - 10,
        {
            align: "center",
        }
    );

    // =========================
    // Download PDF
    // =========================

    doc.save(
        `Quotation-${quotation?.quotationNo ||
        quotation?.id ||
        "quotation"
        }.pdf`
    );
};