import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt, FaComments, FaBook, FaCalendar,
  FaEnvelope, FaUsers, FaEye, FaEdit, FaTrash,
  FaCheck, FaTimes, FaArrowUp, FaArrowDown,
  FaBell, FaSearch, FaCog, FaChartLine,
} from "react-icons/fa";
// import AdminLayout from "../components/AdminLayout";
import "./AdminDashboard.css";

/* ── Static data (replace with API calls) ─────────────────── */
const STATS = [
  { key:"blogs",    icon:FaFileAlt,   label:"Total Blogs",       value:45,   trend:"+12%", up:true,  grad:["#7B52B8","#5C3D8F"] },
  { key:"comments", icon:FaComments,  label:"Pending Comments",  value:12,   trend:"-5%",  up:false, grad:["#E07B3A","#C9A84C"] },
  { key:"ebooks",   icon:FaBook,      label:"Total eBooks",      value:12,   trend:"+8%",  up:true,  grad:["#3A7BD5","#1A5FA8"] },
  { key:"bookings", icon:FaCalendar,  label:"Total Bookings",    value:156,  trend:"+23%", up:true,  grad:["#27AE60","#1E8A4C"] },
  { key:"contacts", icon:FaEnvelope,  label:"Pending Contacts",  value:8,    trend:"-2%",  up:false, grad:["#C0392B","#922B21"] },
  { key:"users",    icon:FaUsers,     label:"Total Users",       value:2341, trend:"+15%", up:true,  grad:["#5C3D8F","#3A2060"] },
];

const BLOGS = [
  { id:1, title:"Understanding Your Horoscope",   author:"Admin", date:"20 Jan 2024", status:"published", views:1250 },
  { id:2, title:"Spiritual Awakening Guide",       author:"Admin", date:"18 Jan 2024", status:"published", views:890  },
  { id:3, title:"Psychology of Success",           author:"Admin", date:"15 Jan 2024", status:"draft",     views:0    },
  { id:4, title:"Paranormal Investigation 101",    author:"Admin", date:"12 Jan 2024", status:"published", views:674  },
];

const COMMENTS = [
  { id:1, author:"Priya Singh",  blog:"Understanding Your Horoscope", text:"Great article! Very informative and helpful.", status:"pending",  date:"20 Jan" },
  { id:2, author:"Rajesh Kumar", blog:"Spiritual Awakening Guide",     text:"Loved this post. Can't wait for the next one.", status:"approved", date:"19 Jan" },
  { id:3, author:"Meena Verma",  blog:"Paranormal Investigation 101",  text:"This changed my perspective completely.",        status:"pending",  date:"18 Jan" },
];

const QUICK_LINKS = [
  { to:"/admin/blogs",    icon:FaFileAlt,  label:"New Blog",    color:"#5C3D8F" },
  { to:"/admin/ebooks",   icon:FaBook,     label:"Add eBook",   color:"#1A5FA8" },
  { to:"/admin/bookings", icon:FaCalendar, label:"Bookings",    color:"#27AE60" },
  { to:"/admin/settings", icon:FaCog,      label:"Settings",    color:"#C9A84C" },
];

/* ── Sub-components ───────────────────────────────────────── */
function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="ad-stat-card">
      <div className="ad-stat-glow" style={{ background:`linear-gradient(135deg,${stat.grad[0]},${stat.grad[1]})` }} aria-hidden="true"/>
      <div className="ad-stat-top">
        <div className="ad-stat-icon" style={{ background:`linear-gradient(135deg,${stat.grad[0]},${stat.grad[1]})` }}>
          <Icon aria-hidden="true"/>
        </div>
        <div className={`ad-stat-trend ${stat.up ? "up" : "down"}`}>
          {stat.up ? <FaArrowUp aria-hidden="true"/> : <FaArrowDown aria-hidden="true"/>}
          <span>{stat.trend}</span>
        </div>
      </div>
      <div className="ad-stat-num">{stat.value.toLocaleString()}</div>
      <div className="ad-stat-lbl">{stat.label}</div>
      <div className="ad-stat-bar">
        <div className="ad-stat-bar-fill" style={{ background:`linear-gradient(90deg,${stat.grad[0]},${stat.grad[1]})`, width:`${Math.min(100, (stat.value / 3000) * 100 + 20)}%` }}/>
      </div>
    </div>
  );
}

function BlogRow({ blog }) {
  return (
    <tr className="ad-tr">
      <td>
        <div className="ad-blog-title">{blog.title}</div>
      </td>
      <td><span className="ad-meta">{blog.author}</span></td>
      <td><span className="ad-meta">{blog.date}</span></td>
      <td>
        <span className={`ad-badge ad-badge-${blog.status}`}>
          {blog.status === "published" ? "Published" : "Draft"}
        </span>
      </td>
      <td>
        <span className="ad-views"><FaEye aria-hidden="true"/>{blog.views.toLocaleString()}</span>
      </td>
      <td>
        <div className="ad-actions">
          <button className="ad-act-btn ad-act-edit" title="Edit"><FaEdit aria-hidden="true"/></button>
          <button className="ad-act-btn ad-act-del" title="Delete"><FaTrash aria-hidden="true"/></button>
        </div>
      </td>
    </tr>
  );
}

function CommentCard({ comment }) {
  return (
    <div className={`ad-comment ${comment.status}`}>
      <div className="ad-comment-header">
        <div className="ad-comment-avatar" aria-hidden="true">
          {comment.author.charAt(0)}
        </div>
        <div className="ad-comment-meta">
          <strong>{comment.author}</strong>
          <span>on "{comment.blog}"</span>
        </div>
        <span className={`ad-badge ad-badge-${comment.status}`}>
          {comment.status}
        </span>
      </div>
      <p className="ad-comment-text">"{comment.text}"</p>
      <div className="ad-comment-footer">
        <span className="ad-meta">{comment.date}</span>
        {comment.status === "pending" && (
          <div className="ad-comment-btns">
            <button className="ad-cb ad-cb-approve"><FaCheck aria-hidden="true"/> Approve</button>
            <button className="ad-cb ad-cb-reject"><FaTimes aria-hidden="true"/> Reject</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main dashboard ───────────────────────────────────────── */
export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    // <AdminLayout>
      <div className="ad-root">

        {/* ── Top bar ─────────────────────────────────── */}
        <div className="ad-topbar">
          <div className="ad-topbar-left">
            <div className="ad-search-box">
              <FaSearch className="ad-search-icon" aria-hidden="true"/>
              <input
                type="search"
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ad-search-input"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="ad-topbar-right">
            <button className="ad-icon-btn" aria-label="Notifications">
              <FaBell aria-hidden="true"/>
              <span className="ad-notif-dot" aria-hidden="true"/>
            </button>
            <button className="ad-icon-btn" aria-label="Settings">
              <FaCog aria-hidden="true"/>
            </button>
            <div className="ad-avatar" aria-label="Admin profile">A</div>
          </div>
        </div>

        {/* ── Welcome banner ──────────────────────────── */}
        <div className="ad-welcome">
          <div className="ad-welcome-text">
            <h2>{greeting}, Admin! 👋</h2>
            <p>Here's what's happening with your website today — {now.toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
          </div>
          <div className="ad-quick-links">
            {QUICK_LINKS.map((q) => (
              <Link key={q.label} to={q.to} className="ad-quick-btn" style={{ "--qc": q.color }}>
                <q.icon aria-hidden="true"/>
                <span>{q.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Stats grid ──────────────────────────────── */}
        <div className="ad-stats-grid">
          {STATS.map((s) => <StatCard key={s.key} stat={s}/>)}
        </div>

        {/* ── Chart placeholder ───────────────────────── */}
        <div className="ad-chart-card">
          <div className="ad-card-header">
            <div>
              <h3 className="ad-card-title">Website Activity</h3>
              <p className="ad-card-sub">Sessions, bookings & enquiries — last 30 days</p>
            </div>
            <div className="ad-chart-legend">
              <span><i style={{ background:"#5C3D8F" }}/> Sessions</span>
              <span><i style={{ background:"#C9A84C" }}/> Bookings</span>
              <span><i style={{ background:"#27AE60" }}/> Contacts</span>
            </div>
          </div>
          {/* Decorative bar chart */}
          <div className="ad-chart-bars" aria-label="Activity chart">
            {[42,65,38,80,55,90,72,48,85,60,75,92,50,68,88,45,70,95,62,77,83,40,66,78,55,89,73,48,91,64].map((h, i) => (
              <div key={i} className="ad-bar-wrap">
                <div className="ad-bar"
                  style={{ height:`${h}%`, background: i % 3 === 0 ? "linear-gradient(to top,#5C3D8F,#7B52B8)" : i % 3 === 1 ? "linear-gradient(to top,#8A6F2E,#C9A84C)" : "linear-gradient(to top,#1E8A4C,#27AE60)" }}
                  title={`Day ${i+1}: ${h}`}
                />
              </div>
            ))}
          </div>
          <div className="ad-chart-labels">
            {["1 Jan","5","10","15","20","25","30 Jan"].map(l => <span key={l}>{l}</span>)}
          </div>
        </div>

        {/* ── Main grid ───────────────────────────────── */}
        <div className="ad-main-grid">

          {/* Recent blogs */}
          <div className="ad-card">
            <div className="ad-card-header">
              <div>
                <h3 className="ad-card-title">Recent Blogs</h3>
                <p className="ad-card-sub">{BLOGS.length} posts this month</p>
              </div>
              <div className="ad-card-actions">
                <Link to="/admin/blogs" className="ad-link-btn">View All →</Link>
                <Link to="/admin/blogs/new" className="ad-new-btn">+ New Blog</Link>
              </div>
            </div>
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {BLOGS.map((b) => <BlogRow key={b.id} blog={b}/>)}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="ad-right-col">

            {/* Pending comments */}
            <div className="ad-card">
              <div className="ad-card-header">
                <div>
                  <h3 className="ad-card-title">Pending Comments</h3>
                  <p className="ad-card-sub">{COMMENTS.filter(c=>c.status==="pending").length} awaiting review</p>
                </div>
                <Link to="/admin/comments" className="ad-link-btn">View All →</Link>
              </div>
              <div className="ad-comments-list">
                {COMMENTS.map((c) => <CommentCard key={c.id} comment={c}/>)}
              </div>
            </div>

            {/* Activity feed */}
            <div className="ad-card">
              <div className="ad-card-header">
                <div>
                  <h3 className="ad-card-title">Recent Activity</h3>
                  <p className="ad-card-sub">Latest actions on your site</p>
                </div>
              </div>
              <div className="ad-feed">
                {[
                  { icon:"📅", text:"New booking from Priya S.", time:"2 min ago",  color:"#27AE60" },
                  { icon:"✉️", text:"Contact form submission",   time:"14 min ago", color:"#C9A84C" },
                  { icon:"📝", text:"Blog 'Jyotish Basics' published", time:"1 hr ago", color:"#5C3D8F" },
                  { icon:"💬", text:"3 new comments pending",   time:"2 hr ago",  color:"#E07B3A" },
                  { icon:"👤", text:"New user registered",       time:"3 hr ago",  color:"#1A5FA8" },
                ].map((f, i) => (
                  <div key={i} className="ad-feed-item">
                    <div className="ad-feed-icon" style={{ background:`${f.color}18`, color:f.color }}>
                      {f.icon}
                    </div>
                    <div className="ad-feed-body">
                      <p>{f.text}</p>
                      <span>{f.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom row ──────────────────────────────── */}
        <div className="ad-bottom-grid">

          {/* Top performing blogs */}
          <div className="ad-card">
            <div className="ad-card-header">
              <div>
                <h3 className="ad-card-title">Top Performing Blogs</h3>
                <p className="ad-card-sub">By total views</p>
              </div>
              <FaChartLine className="ad-section-icon" aria-hidden="true"/>
            </div>
            <div className="ad-perf-list">
              {[
                { title:"Understanding Your Horoscope", views:1250, pct:100 },
                { title:"Spiritual Awakening Guide",    views:890,  pct:71  },
                { title:"Paranormal Investigation 101", views:674,  pct:54  },
                { title:"Occult Psychology Basics",     views:480,  pct:38  },
              ].map((b, i) => (
                <div key={i} className="ad-perf-item">
                  <div className="ad-perf-rank">{i + 1}</div>
                  <div className="ad-perf-body">
                    <div className="ad-perf-title">{b.title}</div>
                    <div className="ad-perf-bar">
                      <div className="ad-perf-fill" style={{ width:`${b.pct}%` }}/>
                    </div>
                  </div>
                  <div className="ad-perf-num">
                    <FaEye aria-hidden="true"/>{b.views.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking overview */}
          <div className="ad-card">
            <div className="ad-card-header">
              <div>
                <h3 className="ad-card-title">Booking Overview</h3>
                <p className="ad-card-sub">By service type</p>
              </div>
              <Link to="/admin/bookings" className="ad-link-btn">Manage →</Link>
            </div>
            <div className="ad-booking-list">
              {[
                { service:"Jyotish Paramarshan",      count:48, color:"#C9A84C", pct:82 },
                { service:"Psychological Counselling", count:36, color:"#5C3D8F", pct:62 },
                { service:"Spiritual Counselling",     count:28, color:"#7B52B8", pct:48 },
                { service:"Paranormal Consultancy",    count:24, color:"#E07B3A", pct:41 },
                { service:"Psych Testing",             count:20, color:"#1A5FA8", pct:34 },
              ].map((b) => (
                <div key={b.service} className="ad-book-item">
                  <div className="ad-book-dot" style={{ background:b.color }} aria-hidden="true"/>
                  <div className="ad-book-body">
                    <div className="ad-book-label">
                      <span>{b.service}</span>
                      <strong>{b.count}</strong>
                    </div>
                    <div className="ad-book-bar">
                      <div className="ad-book-fill" style={{ width:`${b.pct}%`, background:b.color }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats mini */}
          <div className="ad-card ad-mini-stats">
            <div className="ad-card-header">
              <div>
                <h3 className="ad-card-title">Today at a Glance</h3>
                <p className="ad-card-sub">Real-time overview</p>
              </div>
            </div>
            <div className="ad-mini-grid">
              {[
                { label:"New Bookings",    value:"7",  icon:"📅", color:"#27AE60" },
                { label:"New Messages",    value:"12", icon:"✉️", color:"#C9A84C" },
                { label:"New Users",       value:"3",  icon:"👤", color:"#5C3D8F" },
                { label:"Blog Views",      value:"342",icon:"👁️", color:"#1A5FA8" },
                { label:"Sessions Today",  value:"5",  icon:"🗓️", color:"#E07B3A" },
                { label:"Revenue (₹)",     value:"8.2K",icon:"💰",color:"#27AE60" },
              ].map((m) => (
                <div key={m.label} className="ad-mini-card" style={{ "--mc": m.color }}>
                  <span className="ad-mini-icon" aria-hidden="true">{m.icon}</span>
                  <strong className="ad-mini-val">{m.value}</strong>
                  <span className="ad-mini-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    // </AdminLayout>
  );
}