'use client'

import React, { useState } from 'react'
import Link from 'next/link'



export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="nav bg-zinc-50 text-black">
            <div className="container h-20 justify-between flex">
                <h2 className="homebtn h-full w-40 flex items-center justify-center">
                    <Link href="/" className="h-full w-full flex items-center justify-center text-[clamp(2em,2vw,3vw)] font-bold text-green-400 hover:text-green-200 transition-colors">
                        [ Squire ]
                    </Link>
                </h2>

                <div>
                    <button
                        className="burger"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((s) => !s)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <ul className={`menu ${open ? 'open' : ''} bg-zinc-50 top-2em justify-between items-center text-black max-[768px]:w-[clamp(2em,37vw,42vw)] max-[768px]:h-35 max-[768px]:text-[clamp(1.4em,2vw,3vw)]`}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/dashboard">
                                <button className="bg-black hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                                    Dashboard
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <style jsx>{`
                .nav {
                    // background: #111827;
                    // color: #fff;
                }
                .container {
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .brand {
                    font-weight: 700;
                    font-size: 1.125rem;
                    color: #fff;
                    text-decoration: none;
                }
                .burger {
                    display: none;
                    background: transparent;
                    border: none;
                    padding: 0.25rem;
                    gap: 4px;
                    flex-direction: column;
                }
                .burger span {
                    display: block;
                    width: 22px;
                    height: 2px;
                    background: black;
                    margin: 3px 0;
                }
                .menu {
                    list-style: none;
                    display: flex;
                    gap: 1rem;
                    margin: 0;
                    padding: 0;
                }

                .menu a:hover {
                    background: rgba(255, 255, 255, 0.06);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .burger {
                        display: flex;
                    }
                    .menu {
                        position: absolute;
                        // top: 56px;
                        right: 1rem;
                        flex-direction: column;
                        gap: 0;
                        overflow: hidden;
                        transform-origin: top right;
                        transform: scaleY(0);
                        transition: transform 150ms ease;
                        border: 1px solid black;
                        padding-left: 0.2em;
                        // box-shadow: 0 6px 18px rgba(2, 6, 23, 0.6);
                    }
                    .menu.open {
                        transform: scaleY(1);
                    }
                    .menu li + li a {
                        border-top: 1px solid rgba(255, 255, 255, 0.03);
                    }
                    .menu a {
                        display: block;
                    }
                }
            `}</style>
        </nav >
    )
}