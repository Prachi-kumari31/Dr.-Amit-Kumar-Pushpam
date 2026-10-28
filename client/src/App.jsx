import React from "react";
import { Routes, Route, Navigate,Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppChat from "./components/WhatsAppChat";
import ServiceDetail from "./pages/ServiceDetail";

// import Counselling from "./pages/services/Counselling";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
// import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BookSession from "./pages/BookSession";
import Contact from "./pages/Contact";
import MediaGallery from "./pages/MediaGallery";
// import Resources from "./pages/Resources";
// 
// import FounderProfile from "./pages/FounderProfile";
import Ebooks from "./pages/Ebooks";
import EbookDetail from "./pages/EbookDetail";

// import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blog";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";

import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";

// import Books from "./pages/Books";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Publications from "./pages/Publications";
import PublicationDetail from "./pages/PublicationDetail";





// Admin Pages
// import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from "./pages/AdminBlogs";
import AdminComments from "./pages/AdminComments";
import AdminEbooks from "./pages/AdminEbooks";
import AdminBookings from "./pages/AdminBookings";

import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./components/AdminLayout";
import AdminPublications from "./pages/AdminPublications";
import AdminPublicationEditor from "./pages/AdminPublicationEditor";
import AdminArticles from "./pages/AdminArticles";
import AdminArticleEditor from "./pages/AdminArticleEditor";
import AdminStories from "./pages/AdminStories";
import AdminStoryEditor from "./pages/AdminStoryEditor";
import AdminPoems from "./pages/AdminPoems";
import AdminPoemEditor from "./pages/AdminPoemEditor";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminMedia from "./pages/AdminMedia";


// Protected Route
// const ProtectedAdminRoute = ({ children }) => {
//   const isAdmin = localStorage.getItem("isAdmin");
//   const adminToken = localStorage.getItem("adminToken");

//   if (!isAdmin || !adminToken) {
//     return <Navigate to="/admin/login" replace />;
//   }

//     return <Outlet />;
// };

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         {/* <Route path="/blog" element={<Blog />} /> */}
//         {/* <Route path="/blog/:slug" element={<BlogDetail />} /> */}
//         <Route path="/book-session" element={<BookSession />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route
//   path="/gallery"
//   element={<MediaGallery />}
// />



        
//          {/* <Route
//           path="/publications/blogs"
//           element={<Blogs />}
//         /> */}

//         {/* <Route
//           path="/publications/stories"
//           element={<Stories />}
//         />

//         <Route
//           path="/publications/poems"
//           element={<Poems />}
//         />

//         <Route
//           path="/publications/books"
//           element={<Books />}
//         />

//         <Route
//           path="/publications/articles"
//           element={<Articles />}
//         />

//         <Route
//           path="/publications/research"
//           element={<Publications />}
//         />

//         <Route
//           path="/publications/:slug"
//           element={
//             <ContentDetailPage />
//           }
//         /> 
        
//         */} 

//         {/* <Route
//   path="/blog"
//   element={<Blog />}
// />

// <Route
//   path="/blog/:slug"
//   element={<BlogDetail />}
// /> */}

//          <Route
//           path="/blogs"
//           element={<Blogs />}
//         />

//         <Route
//           path="/blogs/:slug"
//           element={<BlogDetail />}
//         />

//         <Route
//           path="/stories"
//           element={<Stories />}
//         />
//         <Route path="/ebooks"
//         element={<Ebooks />}
//         />
//         <Route path ="/ebook/:slug"
//         element={<EbookDetail />}/>

//          <Route
//            path="/stories/:slug"
//           element={<StoryDetail />}
//         />

//         <Route
//           path="/poems"
//           element={<Poems />}
//         />

//          <Route
//           path="/poems/:slug"
//           element={<PoemDetail />}
//         /> 

//         <Route
//           path="/articles"
//           element={<Articles />}
//         />

//         <Route
//           path="/articles/:slug"
//           element={<ArticleDetail />}
//         />

//         <Route
//           path="/publications"
//           element={<Publications />}
//         />

//         <Route
//           path="/publications/:slug"
//           element={
//             <PublicationDetail />
//           }
//           />
      
//         {/* <Route path="/ebook/:slug" element={<EbookDetail />} /> */}
//         {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
//         <Route path="/admin" element={<AdminLayout />} />

//           <Route path="/services" element={<Services />} />

//             {/* <Route path="/services/counselling" element={<Counselling />} /> */}
//         {/* Admin Routes */}

//          <Route
//           path="/admin/login"
//           element={<AdminLogin />}
//         />

//    <Route
//   path="/admin/media"
//   element={
//         <AdminMedia />
//   }
// />
// {/* <Route
//   path="/admin"
//   element={
 
//       <AdminLayout>
//         <AdminDashboard />
//       </AdminLayout>
 
//   }
// /> */}

//         <Route
//           path="/admin/blogs"
//           element={
          
//               <AdminBlogs />
            
//           }
//         />
//         <Route
//           path="/admin/comments"
//           element={
           
//               <AdminComments />
           
//           }
//         />

//         <Route
//   path="/admin/articles"
//   element={<AdminArticles />}
// />
// <Route
//   path="/admin/articles/new"
//   element={<AdminArticleEditor />}
// />
// <Route
//   path="/admin/articles/edit/:id"
//   element={<AdminArticleEditor />}
// />
//          <Route
//           path="/admin/bookings"
//           element={
//               <AdminBookings />
//           }
//         />

  
//         <Route
//           path="/admin/ebooks"
//           element={
//               <AdminEbooks />
//           }
//         />
//         <Route
//   path="/admin/stories"
//   element={<AdminStories />}
// />

// <Route
//   path="/admin/stories/new"
//   element={
//   <AdminLayout>
//   <AdminStoryEditor />
//   </AdminLayout>}
// />


// <Route
//   path="/admin/stories/edit/:id"
//   element={
    
//   <AdminStoryEditor />}
// />


// <Route
//   path="/admin/poems"
//   element={
//    <AdminLayout>
//      <AdminPoems />
//     </AdminLayout>}
// />

// <Route
//   path="/admin/poems/new"
//   element={
//   <AdminLayout>
//   <AdminPoemEditor />
//   </AdminLayout>}
// />

// <Route
//   path="/admin/poems/edit/:id"
//   element={<AdminPoemEditor />}
// />

// <Route
//   path="/admin/testimonials"
//   element={
//     <AdminLayout>
//       <AdminTestimonials />
//     </AdminLayout>
//   }
// />

// <Route
//   path="/services/:serviceSlug"
//   element={<ServiceDetail />}
// />

// <Route
//           path="/admin/publications"
//           element={<AdminLayout>
//             <AdminPublications />
//             </AdminLayout>
//           }
//         />

// <Route
//   path="/admin/publications/new"
//   element={
//       <AdminPublicationEditor />
//   }
// />

// <Route
//   path="/admin/publications/edit/:id"
//   element={
//       <AdminPublicationEditor />
//   }
// />

// <Route
//   path="/admin/enquiries"
//   element={<AdminEnquiries />}
// />

//       </Routes>
//       <Footer />
//       <WhatsAppChat />
//       </>
//   );
// }

// export default App;


const ProtectedAdminRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const adminToken = localStorage.getItem("adminToken");

  if (isAdmin !== "true" || !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

function AdminPage({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/book-session" element={<BookSession />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<MediaGallery />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<StoryDetail />} />
        <Route path="/ebooks" element={<Ebooks />} />
        <Route path="/ebook/:slug" element={<EbookDetail />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/poems/:slug" element={<PoemDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/publications/:slug" element={<PublicationDetail />} />

        {/* Login is public */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* All routes below require the frontend admin check */}
        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="/admin"
            element={<AdminPage><AdminBlogs /></AdminPage>}
          />

          <Route
            path="/admin/blogs"
            element={<AdminPage><AdminBlogs /></AdminPage>}
          />
          <Route
            path="/admin/comments"
            element={<AdminPage><AdminComments /></AdminPage>}
          />
          <Route
            path="/admin/media"
            element={<AdminPage><AdminMedia /></AdminPage>}
          />
          <Route
            path="/admin/bookings"
            element={<AdminPage><AdminBookings /></AdminPage>}
          />
          <Route
            path="/admin/ebooks"
            element={<AdminPage><AdminEbooks /></AdminPage>}
          />
          <Route
            path="/admin/enquiries"
            element={<AdminPage><AdminEnquiries /></AdminPage>}
          />
          <Route
            path="/admin/testimonials"
            element={<AdminPage><AdminTestimonials /></AdminPage>}
          />

          <Route
            path="/admin/stories"
            element={<AdminPage><AdminStories /></AdminPage>}
          />
          <Route
            path="/admin/stories/new"
            element={<AdminPage><AdminStoryEditor /></AdminPage>}
          />
          <Route
            path="/admin/stories/edit/:id"
            element={<AdminPage><AdminStoryEditor /></AdminPage>}
          />

          <Route
            path="/admin/articles"
            element={<AdminPage><AdminArticles /></AdminPage>}
          />
          <Route
            path="/admin/articles/new"
            element={<AdminPage><AdminArticleEditor /></AdminPage>}
          />
          <Route
            path="/admin/articles/edit/:id"
            element={<AdminPage><AdminArticleEditor /></AdminPage>}
          />

          <Route
            path="/admin/poems"
            element={<AdminPage><AdminPoems /></AdminPage>}
          />
          <Route
            path="/admin/poems/new"
            element={<AdminPage><AdminPoemEditor /></AdminPage>}
          />
          <Route
            path="/admin/poems/edit/:id"
            element={<AdminPage><AdminPoemEditor /></AdminPage>}
          />

          <Route
            path="/admin/publications"
            element={<AdminPage><AdminPublications /></AdminPage>}
          />
          <Route
            path="/admin/publications/new"
            element={<AdminPage><AdminPublicationEditor /></AdminPage>}
          />
          <Route
            path="/admin/publications/edit/:id"
            element={<AdminPage><AdminPublicationEditor /></AdminPage>}
          />
        </Route>
      </Routes>

      <Footer />
      <WhatsAppChat />
    </>
  );
}

export default App;