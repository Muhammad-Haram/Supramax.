import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = () => {
    return (
        <div className='blog-container'>
            <div className='solution-content'>
                <h1 className='solution-h1'>News and Insights</h1>
                <p className='solution-para'>We never stop inventing. We have over 100,000 patents to prove it.</p>
            </div>

            <div className='blog-cards'>

                <div className='blog-card'>
                    <div className='blog-img'><img src="/img/blog1.png" alt="" /></div>
                    <div className='blog-content'>
                        <div className='blog-title'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ratione rerum dolores libero, consequatur quis.</div>
                        <div className='readmore'><Link>Read More</Link></div>
                    </div>
                </div>

                <div className='blog-card'>
                    <div className='blog-img'><img src="/img/blog2.png" alt="" /></div>
                    <div className='blog-content'>
                        <div className='blog-title'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ratione rerum dolores libero, consequatur quis.</div>
                        <div className='readmore'><Link>Read More</Link></div>
                    </div>
                </div>

                <div className='blog-card'>
                    <div className='blog-img'><img src="/img/blog3.png" alt="" /></div>
                    <div className='blog-content'>
                        <div className='blog-title'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ratione rerum dolores libero, consequatur quis.</div>
                        <div className='readmore'><Link>Read More</Link></div>
                    </div>
                </div>

                <div className='blog-card'>
                    <div className='blog-img'><img src="/img/blog4.png" alt="" /></div>
                    <div className='blog-content'>
                        <div className='blog-title'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ratione rerum dolores libero, consequatur quis.</div>
                        <div className='readmore'><Link>Read More</Link></div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Blogs
