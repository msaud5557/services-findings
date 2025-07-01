// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic"; // for file uploads

// export async function POST(request) {
//   const contentType = request.headers.get("content-type") || "";
//   if (contentType.includes("multipart/form-data")) {
//     const formData = await request.formData();

//     // Text fields
//     const fullName = formData.get("fullName");
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     const password = formData.get("password");
//     const trade = formData.get("trade");
//     const experience = formData.get("experience");
//     const bio = formData.get("bio");
//     const radius = formData.get("radius");
//     const zip = formData.get("zip");
//     const availability = formData.getAll("availability");
//     const hourlyRate = formData.get("hourlyRate");
//     const backgroundConsent = formData.get("backgroundConsent");

//     // Files
//     const profilePhoto = formData.get("profilePhoto");
//     const idFront = formData.get("idFront");
//     const idBack = formData.get("idBack");
//     const certifications = formData.getAll("certifications");

//     return NextResponse.json({
//       success: true,
//       message: "Signup data received!",
//       data: {
//         fullName,
//         email,
//         phone,
//         trade,
//         experience,
//         bio,
//         radius,
//         zip,
//         availability,
//         hourlyRate,
//         backgroundConsent,
//         profilePhoto: profilePhoto?.name,
//         idFront: idFront?.name,
//         idBack: idBack?.name,
//         certifications: certifications.map(f => f?.name).filter(Boolean),
//       },
//     });
//   } else {
//     const body = await request.json();
//     return NextResponse.json({
//       success: true,
//       message: "Signup data received (JSON)!",
//       data: body,
//     });
//   }
// }
