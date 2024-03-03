import React from 'react';
import styles from './LoadingAnimation.module.css';

const LoadingAnimation = () => {
    const total = 360 * 3;

    return (
        <div className={styles.center} style={{ '--total': total }}>
            {[...Array(total)].map((_, index) => {
                const hue = Math.floor(Math.random() * 360);
                const saturation = '50%';
                const lightness = '50%';
                const color = `hsl(${hue}, ${saturation}, ${lightness})`;

                return (
                    <div
                        key={index}
                        className={styles.particle}
                        style={{
                            '--index': total - index,
                            backgroundColor: color
                        }}
                    />
                );
            })}
        </div>
    );
};

export default LoadingAnimation;
