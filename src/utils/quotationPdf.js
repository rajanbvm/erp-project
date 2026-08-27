import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadQuotationPDF = (quotation) => {
    if (!quotation) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // =========================
    // Header
    // =========================

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text("QUOTATION", pageWidth / 2, 20, {
        align: "center",
    });

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

        head: [["Customer Information", ""]],

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
            "Subtotal (AED)",
        ]],

        body: [
            [
                quotation?.productName || "-",

                Math.round(
                    Number(
                        quotation?.unitPrice || 0
                    )
                ),

                quotation?.quantity || "0",

                Math.round(
                    Number(
                        quotation?.quotationValue || 0
                    )
                ),
            ],
        ],

        theme: "grid",

        styles: {
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fontStyle: "bold",
        },
    });

    // =========================
    // Totals
    // =========================

    const totalsStartY =
        doc.lastAutoTable.finalY + 10;

    const subtotal = Math.round(
        Number(
            quotation?.quotationValue || 0
        )
    );

    const discountAmount = Math.round(
        Number(
            quotation?.discountAmount || 0
        )
    );

    const vatAmount = Math.round(
        Number(
            quotation?.vatAmount || 0
        )
    );

    const grandTotal = Math.round(
        Number(
            quotation?.grandTotal || 0
        )
    );

    autoTable(doc, {
        startY: totalsStartY,

        body: [
            [
                "Subtotal",
                `AED ${subtotal}`,
            ],

            [
                `Discount (${quotation?.discount || 0}%)`,
                `AED ${discountAmount}`,
            ],

            [
                `VAT (${quotation?.vat || 0}%)`,
                `AED ${vatAmount}`,
            ],

            [
                "Grand Total",
                `AED ${grandTotal}`,
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
                cellWidth: 130,
            },

            1: {
                halign: "right",
                cellWidth: 50,
            },
        },

        didParseCell: (data) => {
            // Make Grand Total bold
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
    // Payment Terms
    // =========================

    const paymentY =
        doc.lastAutoTable.finalY + 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text(
        "Payment Terms",
        14,
        paymentY
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
        quotation?.paymentTerms || "-",
        14,
        paymentY + 7
    );

    // =========================
    // Notes
    // =========================

    const notesY =
        paymentY + 22;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text(
        "Notes",
        14,
        notesY
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const notes =
        doc.splitTextToSize(
            quotation?.notes || "-",
            pageWidth - 28
        );

    doc.text(
        notes,
        14,
        notesY + 7
    );

    // =========================
    // Footer
    // =========================

    const pageHeight =
        doc.internal.pageSize.getHeight();

    doc.setFontSize(8);

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
        `Quotation-${quotation?.quotationNo || quotation?.id || "quotation"}.pdf`
    );
};