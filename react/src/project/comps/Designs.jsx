// comps/Designs.jsx
import React from 'react';

export const Designs = () => {
    return (
        <div className="designs-page">
            <h2>🎨 דף עיצובים 🎨</h2>
            <p>כאן תוכל להציג את רכיבי העיצוב המרכזיים של האתר (כפתורים, כותרות, טפסים וכו').</p>
            
            <section className="design-section">
                <h3>כפתורים</h3>
                <button className="btn primary-btn">כפתור ראשי</button>
                <button className="btn secondary-btn">כפתור משני</button>
                <button className="btn danger-btn" disabled>כפתור מושבת</button>
            </section>

            <section className="design-section">
                <h3>כותרות</h3>
                <h1>כותרת ראשית H1</h1>
                <h2>כותרת H2</h2>
                <h3>כותרת H3</h3>
            </section>
            
            <section className="design-section">
                <h3>שדה קלט (Input) לדוגמה</h3>
                <input type="text" placeholder="הקלד טקסט כאן..." className="design-input" />
            </section>
        </div>
    );
}