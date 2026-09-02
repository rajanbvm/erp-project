import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
    BsSearch,
    BsArrowRight,
} from "react-icons/bs";

import Image from "next/image";
import DashIcon from "@/images/DashIcon.svg";
import BuildingOffice from "@/images/BuildingOffice.svg";
import UsersThree from "@/images/UsersThree.svg";
import userIcon from "@/images/UserList.svg";
import TrendUp from "@/images/TrendUp.svg";
import Cube from "@/images/Cube.svg";
import FileText from "@/images/FileText.svg";

const GlobalSearch = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef(null);

    /* =========================
       GET STORAGE DATA
    ========================= */

    const getStorageData = (key) => {
        if (typeof window === "undefined") {
            return [];
        }

        try {
            const data = localStorage.getItem(key);

            if (!data) return [];

            const parsed = JSON.parse(data);

            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error(`Error reading ${key}:`, error);
            return [];
        }
    };

    /* =========================
       GET DISPLAY NAME
    ========================= */

    const getCompanyName = (company) => {
        return (
            company?.companyName ||
            company?.company_name ||
            company?.name ||
            company?.company ||
            company?.title ||
            company?.businessName ||
            company?.business_name ||
            company?.organizationName ||
            company?.organization ||
            null
        );
    };

    const getContactName = (contact) => {
        return (
            contact?.contact ||
            contact?.name ||
            contact?.fullName ||
            contact?.contactName ||
            null
        );
    };

    const getLeadName = (lead) => {
        return (
            lead?.lead ||
            lead?.name ||
            lead?.fullName ||
            lead?.leadName ||
            null
        );
    };

    const getOpportunityName = (opportunity) => {
        return (
            opportunity?.name ||
            opportunity?.title ||
            opportunity?.opportunityName ||
            null
        );
    };

    const getQuotationName = (quotation) => {
        return (
            quotation?.quotationNumber ||
            quotation?.quotationNo ||
            quotation?.quoteNumber ||
            quotation?.quoteNo ||
            null
        );
    };

    /* =========================
       SEARCHABLE TEXT
    ========================= */

    const getSearchableText = (object) => {
        if (!object) return "";

        return Object.values(object)
            .filter(
                (value) =>
                    typeof value === "string" ||
                    typeof value === "number"
            )
            .join(" ")
            .toLowerCase();
    };

    /* =========================
       SEARCH
    ========================= */

    const performSearch = (value) => {
        setSearchQuery(value);

        const query = value.trim().toLowerCase();

        if (!query) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const results = [];

        /* =========================
           COMPANIES
        ========================= */

        const companies =
            getStorageData("companiesData");

        companies.forEach((company) => {
            const searchableText =
                getSearchableText(company);

            if (!searchableText.includes(query)) {
                return;
            }

            const companyName =
                getCompanyName(company);

            // Don't show company if we don't
            // have an actual display name
            if (!companyName) {
                return;
            }

            results.push({
                id: company?.id,
                title: companyName,
                type: "Company",
                icon: BuildingOffice,
                subtitle:
                    company?.email ||
                    company?.phone ||
                    company?.website ||
                    "",

                route: `/admin/companies/view/${company?.id}`,
            });
        });

        /* =========================
           CONTACTS
        ========================= */

        const contacts =
            getStorageData("contactsData");

        contacts.forEach((contact) => {
            const searchableText =
                getSearchableText(contact);

            if (!searchableText.includes(query)) {
                return;
            }

            const contactName =
                getContactName(contact);

            if (!contactName) {
                return;
            }

            results.push({
                id: contact?.id,
                title: contactName,
                type: "Contact",
                icon: UsersThree,
                subtitle:
                    contact?.email ||
                    contact?.designation ||
                    contact?.phone ||
                    "",

                route: `/admin/contacts/view/${contact?.id}`,
            });
        });

        /* =========================
           LEADS
        ========================= */

        const leads =
            getStorageData("leadsData");

        leads.forEach((lead) => {
            const searchableText =
                getSearchableText(lead);

            if (!searchableText.includes(query)) {
                return;
            }

            const leadName =
                getLeadName(lead);

            if (!leadName) {
                return;
            }

            results.push({
                id: lead?.id,
                title: leadName,
                type: "Lead",
                icon: userIcon,
                subtitle:
                    lead?.email ||
                    lead?.company ||
                    lead?.status ||
                    "",

                route: `/admin/leads/view/${lead?.id}`,
            });
        });

        /* =========================
           OPPORTUNITIES
        ========================= */

        const opportunities =
            getStorageData("opportunitiesData");

        opportunities.forEach((opportunity) => {
            const searchableText =
                getSearchableText(opportunity);

            if (!searchableText.includes(query)) {
                return;
            }

            const opportunityName =
                getOpportunityName(opportunity);

            if (!opportunityName) {
                return;
            }

            results.push({
                id: opportunity?.id,
                title: opportunityName,
                type: "Opportunity",
                icon: TrendUp,
                subtitle:
                    opportunity?.company ||
                    opportunity?.stage ||
                    opportunity?.status ||
                    "",

                route: `/admin/opportunities/view/${opportunity?.id}`,
            });
        });

        /* =========================
           QUOTATIONS
        ========================= */

        const quotations =
            getStorageData("quotationData");

        quotations.forEach((quotation) => {
            const searchableText =
                getSearchableText(quotation);

            if (!searchableText.includes(query)) {
                return;
            }

            const quotationName =
                getQuotationName(quotation);

            if (!quotationName) {
                return;
            }

            results.push({
                id: quotation?.id,
                title: quotationName,
                type: "Quotation",
                icon: FileText,
                subtitle:
                    quotation?.company ||
                    quotation?.customer ||
                    quotation?.customerName ||
                    quotation?.status ||
                    "",

                route: `/admin/quotations/view/${quotation?.id}`,
            });
        });

        setSearchResults(results.slice(0, 10));
        setShowResults(true);
    };

    /* =========================
       RESULT CLICK
    ========================= */

    const handleResultClick = (result) => {
        setSearchQuery("");
        setSearchResults([]);
        setShowResults(false);

        router.push(result.route);
    };

    /* =========================
       OUTSIDE CLICK
    ========================= */

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    /* =========================
       ROUTE CHANGE
    ========================= */

    useEffect(() => {
        const handleRouteChange = () => {
            setSearchQuery("");
            setSearchResults([]);
            setShowResults(false);
        };

        router.events.on(
            "routeChangeStart",
            handleRouteChange
        );

        return () => {
            router.events.off(
                "routeChangeStart",
                handleRouteChange
            );
        };
    }, [router]);

    return (
        <div
            className="global-search"
            ref={searchRef}
        >
            {/* =========================
                SEARCH INPUT
            ========================= */}

            <div className="search-input-wrapper">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search companies, contacts, leads..."
                    value={searchQuery}
                    onChange={(e) =>
                        performSearch(e.target.value)
                    }
                    onFocus={() => {
                        if (searchQuery.trim()) {
                            setShowResults(true);
                        }
                    }}
                />

                <span className="search-icon">
                    <BsSearch />
                </span>

            </div>

            {/* =========================
                SEARCH DROPDOWN
            ========================= */}

            {showResults && (
                <div className="global-search-dropdown">

                    <div className="search-results-header">

                        <div>
                            <strong>
                                Search Results
                            </strong>

                            <span>
                                {searchResults?.length} result
                                {searchResults?.length !== 1
                                    ? "s"
                                    : ""}
                            </span>
                        </div>

                    </div>

                    {searchResults?.length > 0 ? (

                        <div className="search-results-list">

                            {searchResults?.map((result) => (

                                <button
                                    type="button"
                                    key={`${result.type}-${result.id}`}
                                    className="search-result-item"
                                    onClick={() =>
                                        handleResultClick(result)
                                    }
                                >

                                    <div className="search-result-icon">
                                        <Image
                                            src={result?.icon}
                                            alt=""
                                            width={20}
                                            height={20}
                                        />
                                    </div>

                                    <div className="search-result-content">

                                        <div className="search-result-title">
                                            {result?.title}
                                        </div>

                                        {result?.subtitle && (
                                            <div className="search-result-subtitle">
                                                {result?.subtitle}
                                            </div>
                                        )}

                                    </div>

                                    <div className="search-result-meta">

                                        <span className="search-result-type">
                                            {result?.type}
                                        </span>

                                        <BsArrowRight />

                                    </div>

                                </button>

                            ))}

                        </div>

                    ) : (

                        <div className="search-no-results">

                            <div className="no-result-icon">
                                <BsSearch />
                            </div>

                            <strong>
                                No results found
                            </strong>

                            <span>
                                Try a different search term
                            </span>

                        </div>

                    )}

                </div>
            )}
        </div>
    );
};

export default GlobalSearch;