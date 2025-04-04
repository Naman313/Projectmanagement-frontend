(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_4ddd5d._.js", {

"[project]/src/components/dashboard/AddTeamMembers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const AddTeamMembers = ({ onClose, onAddMember, teamMembers })=>{
    _s();
    const [selectedMembers, setSelectedMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [membersToBeAdded, setMembersToBeAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredMembers, setFilteredMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showUserList, setShowUserList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchMembers = async (searchTerm)=>{
        if (!searchTerm.trim()) {
            setFilteredMembers([]);
            setShowUserList(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${("TURBOPACK compile-time value", "http://localhost:8000/api")}/users/search?name=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Filter out already selected and added members from API response
            const availableMembers = response.data.filter((member)=>{
                const isNotSelected = !selectedMembers.some((m)=>m.id === member.id);
                const isNotAdded = !membersToBeAdded.some((m)=>m.id === member.id);
                const isNotInTeam = !teamMembers.some((m)=>m.id === member.id);
                return isNotSelected && isNotAdded && isNotInTeam;
            });
            setFilteredMembers(availableMembers);
            setShowUserList(true);
        } catch (err) {
            console.error("Error fetching members:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch members");
            setFilteredMembers([]);
        } finally{
            setIsLoading(false);
        }
    };
    // Debounced search effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddTeamMembers.useEffect": ()=>{
            const delayDebounceFn = setTimeout({
                "AddTeamMembers.useEffect.delayDebounceFn": ()=>{
                    if (search.trim()) {
                        fetchMembers(search);
                    }
                }
            }["AddTeamMembers.useEffect.delayDebounceFn"], 500);
            return ({
                "AddTeamMembers.useEffect": ()=>clearTimeout(delayDebounceFn)
            })["AddTeamMembers.useEffect"];
        }
    }["AddTeamMembers.useEffect"], [
        search
    ]);
    const handleSelectMember = (member)=>{
        if (!selectedMembers.some((m)=>m.id === member.id)) {
            setSelectedMembers((prev)=>[
                    ...prev,
                    member
                ]);
        }
        setSearch("");
        setShowUserList(false);
    };
    const handleInputChange = (e)=>{
        setSearch(e.target.value);
        if (e.target.value.trim()) {
            setShowUserList(true);
        }
    };
    const handleRemoveSelectedMember = (memberId)=>{
        setSelectedMembers((prev)=>prev.filter((m)=>m.id !== memberId));
    };
    const handleRemoveAddedMember = (memberId)=>{
        setMembersToBeAdded((prev)=>prev.filter((m)=>m.id !== memberId));
    };
    const handleSelectMember = (member)=>{
        if (!selectedMembers.some((m)=>m.id === member.id)) {
            setSelectedMembers((prev)=>[
                    ...prev,
                    member
                ]);
        }
        // Don't clear search or hide dropdown - allow for more selections
        setSearch("");
        // Keep the dropdown visible
        setShowUserList(true);
    };
    const handleInputChange = (e)=>{
        setSearch(e.target.value);
        setShowUserList(true);
    };
    const handleAddMember = ()=>{
        if (selectedMembers.length === 0) return;
        // Add all selected members to the list
        setMembersToBeAdded((prev)=>{
            // Filter out any duplicates
            const newMembers = selectedMembers.filter((selected)=>!prev.some((existing)=>existing.id === selected.id));
            return [
                ...prev,
                ...newMembers
            ];
        });
        // Clear selections after adding
        setSelectedMembers([]);
        setSearch("");
        setShowUserList(false);
    };
    const handleRoleSelect = (memberId, role)=>{
        setMembersToBeAdded((prev)=>{
            const updatedMembers = prev.map((member)=>member.id === memberId ? {
                    ...member,
                    role
                } : member);
            const updatedMember = updatedMembers.find((m)=>m.id === memberId);
            if (updatedMember) {
                onAddMember(updatedMember);
            }
            return updatedMembers;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center h-auto bg-black/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl h-[500px] shadow-lg w-[480px] p-5 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-900",
                            children: "Add Team Members"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex relative w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center w-full gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap flex-grow p-0.5 overflow-y-auto border-2 rounded-lg min-h-[40px] max-h-auto",
                                children: [
                                    selectedMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center m-0.5 gap-2 bg-[#5D56BD] rounded-full px-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: member.avatar || "/api/placeholder/40/40",
                                                    alt: "",
                                                    className: "w-5 h-5 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-[#FFFFFF] leading-none",
                                                        children: member.fullName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleRemoveSelectedMember(member.id),
                                                    className: "text-[#FFFFFF] hover:text-red-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, member.id, true, {
                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Add others by name",
                                        className: "flex-grow px-3 py-2 min-w-[120px] text-sm border-none outline-none",
                                        onChange: handleInputChange,
                                        value: search,
                                        onClick: ()=>{
                                            if (search.trim()) {
                                                setShowUserList(true);
                                            }
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddMember,
                                disabled: selectedMembers.length === 0,
                                className: `px-6 py-2 text-white rounded-lg text-sm font-medium ${selectedMembers.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#5D56BD] hover:bg-indigo-700"}`,
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: showUserList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 absolute border-2 rounded-lg bg-white text-sm w-[358px] z-50 shadow-lg max-h-48 overflow-y-auto",
                        children: [
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-center text-gray-500",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 236,
                                columnNumber: 17
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-center text-red-500",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 239,
                                columnNumber: 17
                            }, this),
                            !isLoading && !error && filteredMembers.length === 0 && search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-center text-gray-500",
                                children: "No members found"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                lineNumber: 242,
                                columnNumber: 17
                            }, this),
                            !isLoading && filteredMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer",
                                    onClick: ()=>handleSelectMember(member),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: member.avatar || "/api/placeholder/40/40",
                                            alt: member.fullName,
                                            className: "w-8 h-8 rounded-full mr-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                            lineNumber: 253,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    children: member.fullName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 23
                                                }, this),
                                                member.position && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500",
                                                    children: member.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                            lineNumber: 258,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, member.id, true, {
                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                    lineNumber: 248,
                                    columnNumber: 19
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                        lineNumber: 234,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute mt-4 w-[430px] overflow-x-hidden z-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex text-sm justify-between text-gray-500 mb-4 z-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Team members (",
                                        membersToBeAdded.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mr-20",
                                    children: "Roles"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: membersToBeAdded.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: member.avatar || "/api/placeholder/40/40",
                                                    alt: member.fullName,
                                                    className: "w-10 h-10 rounded-full p-0.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: member.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500",
                                                            children: member.position
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "px-3 py-1 text-sm border border-gray-200 rounded-lg",
                                                    value: member.role || "",
                                                    onChange: (e)=>handleRoleSelect(member.id, e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select Role"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "owner",
                                                            children: "Owner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "admin",
                                                            children: "Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "user",
                                                            children: "User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "client",
                                                            children: "Client"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleRemoveAddedMember(member.id),
                                                    className: "text-gray-400 hover:text-red-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                            lineNumber: 298,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, member.id, true, {
                                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/AddTeamMembers.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
};
_s(AddTeamMembers, "aUinEaaEpXsgujUyXxsu9chVXxs=");
_c = AddTeamMembers;
const __TURBOPACK__default__export__ = AddTeamMembers;
var _c;
__turbopack_refresh__.register(_c, "AddTeamMembers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/auth/Toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Toast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
;
;
function Toast() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
            position: "top-center",
            autoClose: 3000,
            newestOnTop: true,
            pauseOnHover: true,
            theme: "light"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/Toast.tsx",
            lineNumber: 7,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
_c = Toast;
var _c;
__turbopack_refresh__.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/AddMilestone.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/auth/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const AddMilestone = ({ onClose, teamMembers, setmileStone })=>{
    _s();
    const [milestoneDescription, setMilestoneDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedMember, setSelectedMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dueDate, setDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // State for search query
    // Filter team members based on the search query
    const filteredMembers = teamMembers.filter((member)=>member.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleAddMilestone = ()=>{
        if (!milestoneDescription || selectedMember?.length === 0 || !dueDate) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please fill in all fields.");
            return;
        }
        const newMilestone = {
            id: Date.now(),
            description: milestoneDescription,
            assignedTo: selectedMember.join(' '),
            dueDate: dueDate
        };
        setmileStone((prevMilestones)=>[
                ...prevMilestones,
                newMilestone
            ]); // Add to the milestone array
        onClose(); // Close the modal
    };
    const handleSelect = (memberName)=>{
        if (selectedMember) {
            setSelectedMember((prev)=>prev?.includes(memberName) ? prev.filter((member)=>member !== memberName) // Remove if already selected
                 : [
                    ...prev || [],
                    memberName
                ] // Add if not selected
            );
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg w-[400px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-medium text-gray-900",
                                        children: "Add Milestone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "text-gray-400 hover:text-gray-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1.5",
                                                children: "Project Milestone"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter project milestone...",
                                                className: "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500",
                                                value: milestoneDescription,
                                                onChange: (e)=>setMilestoneDescription(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1.5",
                                                children: "Assigned to"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-y-0 left-3 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            className: "w-4 h-4 text-gray-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Search team member",
                                                        className: "w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm",
                                                        value: searchQuery,
                                                        onChange: (e)=>setSearchQuery(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1.5 max-h-32 overflow-y-auto",
                                                children: filteredMembers.slice(0, 5).map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>handleSelect(member.fullName),
                                                        className: `relative flex items-center gap-2 px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${selectedMember.includes(member.fullName) ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-200 hover:bg-gray-50"}`,
                                                        children: [
                                                            selectedMember.includes(member.fullName) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-0.75 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center",
                                                                children: "✔"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                                lineNumber: 120,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: member.avatar,
                                                                alt: member.fullName,
                                                                className: "w-5 h-5 rounded-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-900",
                                                                        children: member.fullName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                                        lineNumber: 131,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-500",
                                                                        children: [
                                                                            "(",
                                                                            member.role,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                                        lineNumber: 132,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                                lineNumber: 130,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, member.id, true, {
                                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1.5",
                                                children: "Due Date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                className: "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500",
                                                value: dueDate,
                                                onChange: (e)=>setDueDate(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                                lineNumber: 144,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "px-4 py-1.5 bg-gray-100 text-gray-600 rounded text-sm font-medium hover:bg-gray-200",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddMilestone,
                                        className: "px-4 py-1.5 bg-[#5D56BD] text-white rounded text-sm font-medium hover:bg-[#4A44A7]",
                                        children: "Add Milestone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/AddMilestone.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(AddMilestone, "KFFQGn+FvNnlSOopJ8JLKbi7hxo=");
_c = AddMilestone;
const __TURBOPACK__default__export__ = AddMilestone;
var _c;
__turbopack_refresh__.register(_c, "AddMilestone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/Create_Project_modal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddTeamMembers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/dashboard/AddTeamMembers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddMilestone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/dashboard/AddMilestone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/auth/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
const CreateNewProject = ({ onClose })=>{
    _s();
    const [projectName, setProjectName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [projectCategory, setProjectCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [aboutProject, setAboutProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [collaboration, setCollaboration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [teamMembers, setTeamMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleAddMember = (newMember)=>{
        setTeamMembers((prev)=>{
            const extingIndex = prev.findIndex((member)=>member.id === newMember.id);
            if (extingIndex !== -1) {
                if (newMember.role === "Select Role") {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a valid role");
                }
                const updatedList = [
                    ...prev
                ];
                updatedList[extingIndex] = {
                    ...updatedList[extingIndex],
                    role: newMember.role
                };
                return updatedList;
            }
            return [
                ...prev,
                newMember
            ];
        });
    // setTeamMembers((prev)=> [...prev, newMember])
    };
    const [milestones, setmileStone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAddTeamMemberModalOpen, setAddTeamMemberModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAddMilestone, setAddMilestone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClick = async ()=>{
        // const projectData = {
        //   projectName,
        //   projectCategory,
        //   aboutProject,
        //   collaboration,
        //   teamMembers,
        //   milestones,
        // };
        const projectData = {
            name: projectName,
            category: projectCategory,
            description: aboutProject,
            collaboration,
            members: teamMembers.map((member)=>({
                    _id: member.id,
                    name: member.fullName,
                    role: member.role
                })),
            milestones: milestones.map((milestone)=>({
                    title: milestone.description,
                    assignedTo: teamMembers.find((member)=>member.fullName === milestone.assignedTo)?.id || null,
                    dueDate: milestone.dueDate
                })),
            private: false
        };
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "http://localhost:8000/api")}/projects/create`, projectData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 201) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Project created successfully");
                console.log("Project created successfully:", response.data.project);
                setTimeout(()=>{
                    onClose(); // Close the modal after successful creation
                }, 3000);
            }
        } catch (error) {
            console.error("Failed to create project:", error);
        }
        console.log("Project Data:", projectData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg w-[1000px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center px-6 py-4 border-b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold",
                                        children: "Create New Project"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5 text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                        className: "w-6 h-6 text-gray-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                        lineNumber: 132,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 131,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        className: "w-3 h-3 text-white"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                        lineNumber: 135,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 134,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: "Project Image"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-xs text-gray-600 mb-1",
                                                                    children: "Project Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "Enter project name",
                                                                    className: "w-full h-8 px-2 rounded border border-gray-200 text-sm",
                                                                    value: projectName,
                                                                    onChange: (e)=>setProjectName(e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 146,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-xs text-gray-600 mb-1",
                                                                    children: "Project Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 155,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "w-full h-8 px-2 rounded border border-gray-200 text-sm",
                                                                    value: projectCategory,
                                                                    onChange: (e)=>setProjectCategory(e.target.value),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            disabled: true,
                                                                            hidden: true,
                                                                            children: "Select Category"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Product",
                                                                            children: "Product Development"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 166,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Customer",
                                                                            children: "Customer Relation Manager(CRM)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 167,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Enterprise",
                                                                            children: "Enterprise Resource Planning(ERP)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 170,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "AI",
                                                                            children: "Artificial Intelligence(AI)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 173,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "DevOps",
                                                                            children: "DevOps"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 174,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Web Development",
                                                                            children: "Web Development"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Mobile Development",
                                                                            children: "Mobile Development"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 176,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Cybersecurity",
                                                                            children: "Cybersecurity"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 179,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs text-gray-600 mb-1",
                                                            children: "Team Members"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded p-2 h-24 overflow-y-auto",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-1",
                                                                children: teamMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 hover:bg-[#0000001A] rounded-full p-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: member.avatar,
                                                                                alt: "",
                                                                                className: "w-5 h-5 rounded-full"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                lineNumber: 195,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-[#333333]",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-medium  leading-none",
                                                                                        children: member.fullName
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                        lineNumber: 201,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: " text-[10px] leading-tight",
                                                                                        children: member.role
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                        lineNumber: 204,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                lineNumber: 200,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setTeamMembers((prev)=>prev.filter((tm)=>tm.id != member.id)),
                                                                                className: "text-gray-500 hover:text-white hover:bg-[#FF0000]",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                    lineNumber: 216,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                lineNumber: 208,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, member.id, true, {
                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                        lineNumber: 191,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center pt-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "px-4 py-2.5 rounded-lg bg-[#5D56BD] text-white hover:bg-[#4A44A7] text-sm flex items-center gap-2",
                                                                onClick: ()=>setAddTeamMemberModalOpen(true),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                        lineNumber: 229,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    " Add Member"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs text-gray-600 mb-1",
                                                            children: "About Project"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            placeholder: "Describe...",
                                                            rows: 3,
                                                            className: "w-full px-2 py-1.5 rounded border border-gray-200 text-sm resize-none",
                                                            value: aboutProject,
                                                            onChange: (e)=>setAboutProject(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs text-gray-600 mb-1",
                                                            children: "How we collaborate?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            placeholder: "Describe...",
                                                            rows: 3,
                                                            className: "w-full px-2 py-1.5 rounded border border-gray-200 text-sm resize-none",
                                                            value: collaboration,
                                                            onChange: (e)=>setCollaboration(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs text-gray-600 mb-1",
                                                            children: "Milestones (Optional)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded p-2 h-24 overflow-y-auto",
                                                            children: milestones.map((milestone)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-gray-50 p-2 rounded text-xs",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-900 leading-tight",
                                                                            children: milestone.description
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 273,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 mt-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: "/api/placeholder/24/24",
                                                                                            alt: "",
                                                                                            className: "w-4 h-4 rounded-full"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                            lineNumber: 278,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-gray-600",
                                                                                            children: milestone.assignedTo
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                            lineNumber: 283,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                    lineNumber: 277,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-gray-600",
                                                                                    children: [
                                                                                        "Due date: ",
                                                                                        milestone.dueDate
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, milestone.id, true, {
                                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center pt-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "px-4 py-2.5 rounded-lg bg-[#5D56BD] text-white hover:bg-[#4A44A7] text-sm flex items-center gap-2",
                                                                onClick: ()=>setAddMilestone(true),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                        lineNumber: 300,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    " Add Milestone"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-2 px-6 py-4 border-t",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 py-1.5 bg-[#5D56BD] text-white rounded text-sm font-medium hover:bg-indigo-700",
                                        onClick: handleClick,
                                        children: "Create Project"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "px-4 py-1.5 bg-gray-100 text-gray-600 rounded text-sm font-medium hover:bg-gray-200",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                        lineNumber: 323,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    isAddTeamMemberModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddTeamMembers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onClose: ()=>setAddTeamMemberModalOpen(false),
                        onAddMember: handleAddMember,
                        teamMembers: teamMembers
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this),
                    isAddMilestone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$AddMilestone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onClose: ()=>setAddMilestone(false),
                        teamMembers: teamMembers,
                        setmileStone: setmileStone
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/Create_Project_modal.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(CreateNewProject, "w4vI9moXAxJ4p1ODKSwZSOR55BE=");
_c = CreateNewProject;
const __TURBOPACK__default__export__ = CreateNewProject;
var _c;
__turbopack_refresh__.register(_c, "CreateNewProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/myProjects/MyProjects.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Create_Project_modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/dashboard/Create_Project_modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
// const projectData = [
//   {
//     id: 1,
//     letter: "H",
//     name: "Hyperion Security",
//     category: "Cybersecurity",
//   },
//   {
//     id: 2,
//     letter: "M",
//     name: "Mercury AI Assistant",
//     category: "Artificial Intelligence",
//   },
// ];
const MyProjects = ()=>{
    _s();
    const [projectData, setProjectData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modal, setModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // const [error, setError] = useState<string | null>(null);
    // Replace with the actual token
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyProjects.useEffect": ()=>{
            const Storedtoken = localStorage.getItem("token");
            setToken(Storedtoken);
        }
    }["MyProjects.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyProjects.useEffect": ()=>{
            const fetchProjects = {
                "MyProjects.useEffect.fetchProjects": async ()=>{
                    if (token) {
                        try {
                            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${("TURBOPACK compile-time value", "http://localhost:8000/api")}/projects/my-projects`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            let projects = response.data;
                            setProjectData(projects.filter({
                                "MyProjects.useEffect.fetchProjects": (proj)=>proj.trashed !== true
                            }["MyProjects.useEffect.fetchProjects"]));
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    ;
                }
            }["MyProjects.useEffect.fetchProjects"];
            fetchProjects();
        }
    }["MyProjects.useEffect"], [
        token
    ]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const colors = [
        "bg-teal-200 text-teal-600",
        "bg-rose-200 text-rose-600",
        "bg-gray200 text-gray-600",
        "bg-orange-200 text-orange-600",
        "bg-blue-200 text-blue-600",
        "bg-blue-200 text-blue-600",
        "bg-orange-200 text-orange-600"
    ];
    const handleClick = (project)=>{
        console.log(project._id);
        router.push(`/main/${project._id}/overview`);
    };
    const createFirst = ()=>{
        setModal(true);
    };
    const modalFalse = ()=>{
        setModal(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mx-auto space-y-2",
        children: [
            projectData.length <= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "\\assets\\Illustration (4).png",
                                alt: "Empty chat",
                                className: "w-full h-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#4D4D4D] mb-4",
                        children: "No Project Found"
                    }, void 0, false, {
                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full py-2 px-4 bg-[#5D56BD] text-white text-sm rounded-lg hover:bg-[#5D56BD] transition-colors",
                        onClick: createFirst,
                        children: "Create your first project"
                    }, void 0, false, {
                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: projectData.map((project, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start bg-white justify-between p-4 hover:bg-blue-50 rounded-lg max-w-10xl",
                        onClick: ()=>handleClick(project),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center hover:cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-10 h-10 flex-shrink-0 ${colors[Math.floor(Math.random() * 10) % colors.length]} rounded-full flex items-center justify-center`,
                                        children: project.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-[#333333]",
                                                children: project.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: project.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this)
                        ]
                    }, project._id, true, {
                        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this),
            modal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Create_Project_modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: modalFalse
            }, void 0, false, {
                fileName: "[project]/src/components/myProjects/MyProjects.tsx",
                lineNumber: 134,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/myProjects/MyProjects.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
};
_s(MyProjects, "pwD88Ae5PogSAzoQGWQAxOwISEg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MyProjects;
const __TURBOPACK__default__export__ = MyProjects;
var _c;
__turbopack_refresh__.register(_c, "MyProjects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
 // "use client";
 // import React, { useState, useEffect } from "react";
 // import Link from "next/link";
 // import Image from "next/image";
 // import { Plus } from "lucide-react";
 // import EditProjectModal from "./../overview/EditProjectModal";
 // import { useSearchParams } from "next/navigation";
 // import axios from "axios";
 // import { useParams } from "react-router-dom";
 // export default function ProjectDashboard() {
 //   const searchParams = useSearchParams();
 //   const [projectName, setProjectName] = useState<string | null>(null);
 //   const [milestones, setMilestones] = useState([]);
 //   const [isEdit, setisEdit] = useState(false);
 //   const token = localStorage.getItem("token"); // Replace with the actual token
 //   const [error, setError] = useState<string | null>(null);
 //   // const [projectData, setProjectData] = useState([]);
 //   const teamMembers = [
 //     { name: "Naman", role: "Senior Project Manager" },
 //     { name: "Taarush", role: "UI/UX Designer" },
 //     { name: "Sansdesh", role: "Frontend Developer" },
 //     { name: "Prashant", role: "Frontend Developer" },
 //     { name: "Mr. anonymous", role: "UI/UX Designer" },
 //   ];
 //   interface Notice {
 //     id: number;
 //     title: string;
 //     content: string;
 //     Duedate: string;
 //     author: string;
 //   }
 //   const projectData = [
 //     {
 //       id: 1,
 //       letter: "H",
 //       name: "Hyperion Security",
 //       category: "Cybersecurity",
 //     },
 //     {
 //       id: 2,
 //       letter: "M",
 //       name: "Mercury AI Assistant",
 //       category: "Artificial Intelligence",
 //     },
 //   ];
 //   const noticeBoard: Notice[] = [
 //     {
 //       id: 1,
 //       title: "Team Meeting Schedule Update",
 //       content: "Daily standups moved to 10 AM EST",
 //       Duedate: "2024-01-17",
 //       author: "Taarush",
 //     },
 //   ];
 //   // const milestones = [
 //   //   {
 //   //     id: "1",
 //   //     title:
 //   //       "Complete the collection of all project requirements and stakeholder needs.",
 //   //     dueDate: "2024-08-20",
 //   //     assignee: "Taarush",
 //   //     completeDate: "2024-01-1-20",
 //   //   },
 //   //   {
 //   //     id: "2",
 //   //     title: "Complete the Hey Page",
 //   //     dueDate: "2024-01-21",
 //   //     assignee: "Sandesh",
 //   //     completeDate: "2024-01-1-20",
 //   //   },
 //   // ];
 //   useEffect(() => {
 //     const fetchMilestones = async () => {
 //       try {
 //         const response = await axios.get(
 //           `${process.env.NEXT_PUBLIC_API_URL}/projects/upcoming-milestones`, // Replace with the actual endpoint
 //           {
 //             headers: {
 //               Authorization: `Bearer ${token}`,
 //             },
 //           }
 //         );
 //         const milestones = response.data;
 //         // console.log(milestones)
 //         setMilestones(milestones);
 //         // console.log(stuffDue);
 //       } catch (err) {
 //         if (axios.isAxiosError(err)) {
 //           setError(err.response?.data?.message || "Failed to fetch milestones");
 //         } else {
 //           setError("Failed to fetch milestones");
 //         }
 //       }
 //     };
 //     fetchMilestones();
 //   }, [token]);
 //   const handleStatusChange = async (
 //     milestoneId: string,
 //     projectId: string,
 //     newStatus: string
 //   ) => {
 //     try {
 //       await axios.patch(
 //         `${process.env.NEXT_PUBLIC_API_URL}/projects/milestones/update-status/?projectId=${projectId}&milestoneId=${milestoneId}`,
 //         { status: newStatus }, // Request body
 //         {
 //           headers: {
 //             Authorization: `Bearer ${token}`,
 //           },
 //         }
 //       );
 //       // Update status in the UI
 //       // setMilestones((prev) =>
 //       //   prev.map((item) =>
 //       //     item._id === milestoneId ? { ...item, status: newStatus } : item
 //       //   )
 //       // );
 //     } catch (err) {
 //       console.error("Error updating milestone status:", err);
 //       setError("Failed to update milestone status. Please try again.");
 //     }
 //   };
 //   const handleClick = () => {
 //     setisEdit(true);
 //   };
 //   // useEffect(() => {
 //   //   var projectId = searchParams.get('projectId');
 //   //   if (projectId) {
 //   //     const project = projectData.find((p) => p.id.toString() === projectId);
 //   //     setProjectName(project ? project.name : 'Project not found');
 //   //   }
 //   // }, []);
 //   return (
 //     <>
 //       <div className="min-h-screen bg-[#F8F7FA]">
 //         {/* Header Section */}
 //         <div className="pl-6 pr-6 pb-0">
 //           <nav className="flex items-center justify-between mb-6 text-gray-600 text-sm">
 //             {/* Left aligned: Breadcrumb navigation */}
 //             <div className="flex items-center space-x-2">
 //               <Link href="/main/dashboard" className="hover:text-gray-900">
 //                 Dashboard
 //               </Link>
 //               <span className="text-gray-400">›</span>
 //               <Link href="/projects" className="hover:text-gray-900">
 //                 Project Atlas
 //               </Link>
 //               <span className="text-gray-400">›</span>
 //               <span className="text-black">
 //                 {projectName || "Loading..."}
 //               </span>{" "}
 //               {/* Display project name */}
 //             </div>
 //             {/* Right aligned: Buttons */}
 //             <div className="flex items-center space-x-2">
 //               <button className="p-2 hover:bg-gray-100 rounded-lg border-2">
 //                 <Image src="/assets/Pin.png" alt="Pin" width={24} height={24} />
 //               </button>
 //               <button className="p-2 hover:bg-gray-100 rounded-lg border-2">
 //                 <Image
 //                   src="/assets/Archive Icon.png"
 //                   alt="Archive"
 //                   width={24}
 //                   height={24}
 //                 />
 //               </button>
 //               <button
 //                 className="px-4 py-2 bg-[#5D56BD] text-white rounded-lg"
 //                 onClick={handleClick}
 //               >
 //                 Edit project
 //               </button>
 //             </div>
 //           </nav>
 //         </div>
 //         {/* Main Content Grid */}
 //         <div className="grid grid-cols-3 gap-6 p-6">
 //           {/* Campfire Section */}
 //           <div className="col-span-2 bg-white rounded-xl p-6">
 //             <div className="flex justify-between items-center mb-4">
 //               <h2 className="text-xl font-semibold">Campfire</h2>
 //               <button className="text-indigo-600 text-sm">Show all</button>
 //             </div>
 //             <div className="flex flex-col items-center justify-center py-12">
 //               <Image
 //                 src="/assets/Campfire Illustration.png"
 //                 alt="No Messages"
 //                 width={120}
 //                 height={120}
 //               />
 //               <p className="text-gray-500 mt-4">No Messages</p>
 //             </div>
 //           </div>
 //           {/* Project Status Section */}
 //           <div className="col-span-1 bg-[#1C1C38] text-white rounded-xl p-6">
 //             <h2 className="text-xl font-semibold mb-4">Project Status</h2>
 //             <div className="flex justify-between items-center mb-6">
 //               <span>On Track</span>
 //               <button className="px-3 py-1 bg-green-500 rounded-lg text-sm">
 //                 Update Status
 //               </button>
 //             </div>
 //             {/* Existing Milestones Section */}
 //             <div className="mb-6">
 //               {milestones.length > 0 ? (
 //                 milestones.map((milestone) => (
 //                   <div
 //                     key={milestone.id}
 //                     className="bg-white text-[#4D4D4D] p-4 mb-3 rounded-lg"
 //                   >
 //                     <div className="flex items-center mb-2">
 //                       <Image
 //                         src="/assets/avtar.jpg"
 //                         alt="avatar"
 //                         width={34}
 //                         height={34}
 //                         className="w-10 h-10 bg-gray-200 rounded-full"
 //                       />
 //                       <h3 className="font-medium ml-2">
 //                         {milestone.assignedTo}
 //                       </h3>
 //                     </div>
 //                     <div className="text-sm">{milestone.title}</div>
 //                     <div className="text-xs text-gray-500">
 //                       Due Date: {milestone.dueDate}
 //                     </div>
 //                     <div className="text-xs text-gray-500">
 //                       Completed Date: {milestone.completeDate}
 //                     </div>
 //                   </div>
 //                 ))
 //               ) : (
 //                 <div className="flex flex-col items-center justify-center py-8">
 //                   <Image
 //                     src="/assets/Empty Project Illustration.png"
 //                     alt="Empty Status"
 //                     width={100}
 //                     height={100}
 //                   />
 //                   <p className="text-gray-400 mt-4">Empty Project Status</p>
 //                 </div>
 //               )}
 //             </div>
 //             {/* New Timeline Section */}
 //             <div className="mt-8">
 //               <div className="flex items-center mb-4">
 //                 <div className="flex items-center">
 //                   <svg
 //                     className="w-5 h-5 mr-2"
 //                     fill="currentColor"
 //                     viewBox="0 0 20 20"
 //                   >
 //                     <path
 //                       fillRule="evenodd"
 //                       d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
 //                       clipRule="evenodd"
 //                     />
 //                   </svg>
 //                   <span className="font-medium">Due Date</span>
 //                 </div>
 //                 <div>
 //                   <span className="ml-2 text-sm text-gray-300">
 //                     {new Date().toLocaleDateString("en-GB", {
 //                       day: "2-digit",
 //                       month: "short",
 //                       year: "numeric",
 //                     })}
 //                   </span>
 //                 </div>
 //               </div>
 //               <div className="relative">
 //                 {milestones.map((task, index) => (
 //                   <div key={task.id} className="mb-6 relative pl-8">
 //                     {/* Timeline connector line */}
 //                     <div className="absolute left-3 top-0 h-full w-px bg-gray-600" />
 //                     {/* Timeline number indicator */}
 //                     <div className="absolute left-0 w-6 h-6 rounded-full bg-[#FFB13B] flex items-center justify-center text-sm">
 //                       {index + 1}
 //                     </div>
 //                     {/* Task content */}
 //                     <div className="pl-4">
 //                       <div className="flex items-center mb-2">
 //                         <Image
 //                           src="/assets/avtar.jpg"
 //                           alt={task.assignee}
 //                           width={24}
 //                           height={24}
 //                           className="rounded-full"
 //                         />
 //                         <span className="ml-2 text-sm">{task.assignee}</span>
 //                       </div>
 //                       <p className="text-sm">{task.title}</p>
 //                     </div>
 //                   </div>
 //                 ))}
 //               </div>
 //             </div>
 //           </div>
 //           {/* Notice Board Section */}
 //           <div className="col-span-2 bg-white rounded-xl p-6">
 //             <div className="flex justify-between items-center mb-4">
 //               <h2 className="text-xl font-semibold">Notice Board</h2>
 //               <button className="text-[#5D56BD] text-sm">Show all</button>
 //             </div>
 //             {noticeBoard.length > 0 ? (
 //               <div className="space-y-4">
 //                 {noticeBoard.map((notice) => (
 //                   <div
 //                     key={notice.id}
 //                     className="border rounded-lg p-4 hover:shadow-md transition-shadow"
 //                   >
 //                     <h3 className="font-medium">{notice.title}</h3>
 //                     <p className="text-gray-600 text-sm mb-3">
 //                       {notice.content}
 //                     </p>
 //                     <div className="flex items-center text-sm text-gray-500">
 //                       <Image
 //                         src="/assets/avtar.jpg"
 //                         alt="avatar"
 //                         width={34}
 //                         height={34}
 //                         className="w-10 h-10 bg-gray-200 rounded-full"
 //                       />
 //                       <span className="ml-2">{notice.author}</span>
 //                       <span className="ml-2">Published on:&nbsp;</span>
 //                       <span>
 //                         {new Date(notice.Duedate).toLocaleDateString("en-GB", {
 //                           day: "2-digit",
 //                           month: "short",
 //                           year: "numeric",
 //                         })}
 //                       </span>
 //                       <span className="mx-2"></span>
 //                     </div>
 //                   </div>
 //                 ))}
 //               </div>
 //             ) : (
 //               <div className="flex flex-col items-center justify-center py-12">
 //                 <Image
 //                   src="/assets/Notice Board Illustration.png"
 //                   alt="Empty Notice Board"
 //                   width={120}
 //                   height={120}
 //                 />
 //                 <p className="text-gray-500 mt-4">Empty Notice Board</p>
 //               </div>
 //             )}
 //           </div>
 //           {/* Team Members Section */}
 //           <div className="col-span-2 bg-white rounded-xl p-6">
 //             <div className="flex justify-between items-center mb-6">
 //               <h2 className="text-xl font-semibold">
 //                 Team Members <span>({teamMembers.length})</span>
 //               </h2>
 //             </div>
 //             <div className="grid grid-cols-3">
 //               <div className="flex flex-wrap gap-4 col-span-2">
 //                 {teamMembers.map((member, index) => (
 //                   <div
 //                     key={index}
 //                     className="flex text-[#5D56BD] items-center space-x-2"
 //                   >
 //                     <Image
 //                       src="/assets/avtar.jpg"
 //                       alt="avtar"
 //                       width={34}
 //                       height={34}
 //                       className="w-10 h-10 bg-gray-200 rounded-full"
 //                     />
 //                     <div>
 //                       <p className="font-medium">{member.name}</p>
 //                       <p className="text-sm text-gray-500">{member.role}</p>
 //                     </div>
 //                   </div>
 //                 ))}
 //               </div>
 //               <button className="flex flex-row justify-center items-center px-4 py-2 bg-[#5D56BD] text-white rounded-lg">
 //                 <div>
 //                   <Plus className="w-4 h-4 mr-2" />
 //                 </div>
 //                 Add Team Members
 //               </button>
 //             </div>
 //           </div>
 //           {/* Milestones Section */}
 //           <div className="col-span-2 bg-white rounded-xl p-6">
 //             <div className="flex justify-between items-center mb-6">
 //               <h2 className="text-xl font-semibold">Milestones (2)</h2>
 //               <button className="px-4 py-2 bg-[#5D56BD] text-white rounded-lg flex items-center">
 //                 <Plus className="w-4 h-4 mr-2" />
 //                 Add Milestone
 //               </button>
 //             </div>
 //             {milestones.length > 0 ? (
 //               <div className="space-y-4">
 //                 {milestones.map((milestone) => (
 //                   <div
 //                     key={milestone.id}
 //                     className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
 //                   >
 //                     <div className="flex items-center space-x-3">
 //                       <input
 //                         type="checkbox"
 //                         className="w-5 h-5 text-[#5D56BD] rounded"
 //                         checked={milestone.status === "completed"} // Reflect current status
 //                         onChange={() =>
 //                           handleStatusChange(
 //                             milestone._id,
 //                             milestone.projectId, // Replace with actual projectId if available
 //                             milestone.status === "completed"
 //                               ? "pending"
 //                               : "completed"
 //                           )
 //                         }
 //                       />
 //                       <div>
 //                         <h3 className="font-medium text-gray-900">
 //                           {milestone.title}
 //                         </h3>
 //                         <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
 //                           <Image
 //                             src="/assets/avtar.jpg"
 //                             alt="avtar"
 //                             width={34}
 //                             height={34}
 //                             className="w-10 h-10 bg-gray-200 rounded-full"
 //                           />
 //                           <span>{milestone.assignedTo}</span>
 //                         </div>
 //                       </div>
 //                     </div>
 //                     <div className="flex items-center space-x-3">
 //                       <span className="text-sm text-gray-500">
 //                         Due date:&nbsp;
 //                         {new Date(milestone.dueDate).toLocaleDateString(
 //                           "en-GB",
 //                           {
 //                             day: "2-digit",
 //                             month: "short",
 //                             year: "numeric",
 //                           }
 //                         )}
 //                       </span>
 //                       <button className="p-2  rounded-lg">
 //                         <Image
 //                           src="/assets/Edit Button.png"
 //                           alt="Edit"
 //                           width={16}
 //                           height={16}
 //                         />
 //                       </button>
 //                     </div>
 //                   </div>
 //                 ))}
 //               </div>
 //             ) : (
 //               <div className="flex flex-col items-center justify-center py-12">
 //                 <Image
 //                   src="/assets/Milestone Illustration.png"
 //                   alt="No Milestone"
 //                   width={120}
 //                   height={120}
 //                 />
 //                 <p className="text-gray-500 mt-4">No Milestones</p>
 //               </div>
 //             )}
 //           </div>
 //         </div>
 //       </div>
 //       {isEdit && (
 //         <EditProjectModal isOpen={isEdit} onClose={() => setisEdit(false)} />
 //       )}
 //     </>
 //   );
 // }
}}),
"[project]/src/app/main/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_4ddd5d._.js.map