import React, { useState } from 'react';
import "./Animation.css";
import { AnimatePresence, motion } from "framer-motion";

function Animation() {
    const [selectedId, setSelectedId] = useState(null);

    const items = [
        {
            id: 1,
            title: "Animation 1",
            subtitle: 'A production-ready motion library for React. Get started. Animation. Variants. Gestures. Drag. Scroll. Path. Production-ready declarative animations.'
        },
        {
            id: 2,
            title: "Animation 2",
            subtitle: 'A production-ready motion library for React. Get started. Animation. Variants. Gestures. Drag. Scroll. Path. Production-ready declarative animations.'
        },
        {
            id: 3,
            title: "Animation 3",
            subtitle: 'A production-ready motion library for React. Get started. Animation. Variants. Gestures. Drag. Scroll. Path. Production-ready declarative animations.'
        },
        {
            id: 4,
            title: "Animation 4",
            subtitle: 'A production-ready motion library for React. Get started. Animation. Variants. Gestures. Drag. Scroll. Path. Production-ready declarative animations.'
        }
    ];

    const selectedItem = items.find(item => item.id === selectedId);

    return (
        <div style={{ background: "#f107a3", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* List of Items */}
            <div className="items-container">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        layoutId={item.id}
                        className="item-card"
                        onClick={() => setSelectedId(item.id)}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <motion.h5>{item.subtitle}</motion.h5>
                        <motion.h2>{item.title}</motion.h2>
                    </motion.div>
                ))}
            </div>

            {/* Selected Item with AnimatePresence */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        layoutId={selectedItem.id}
                        className="expanded-item"
                        style={{
                            background: "red",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "80%",
                            textAlign: "center",
                            position: "absolute",
                            top: "20%",
                            zIndex: 10
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.h5>{selectedItem.subtitle}</motion.h5>
                        <motion.h2>{selectedItem.title}</motion.h2>
                        <motion.button
                            onClick={() => setSelectedId(null)}
                            whileHover={{ scale: 1.1 }}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                background: "#f107a3",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Animation;
