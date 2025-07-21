//
//  TutorialView.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/26/25.
//

import SwiftUI

struct TutorialView: View {
    @State private var navigateToMain = false
    @State private var step = 0

    let tips = [
        ("FoundIt", "The only Lost and Found app you will ever need"),
        ("Upload Items", "Take a picture of found items and submit it here. Remember: Do not add items with sensitive info."),
        ("Search for Yours", "Browse items found by others.")
    ]

    var body: some View {
        NavigationStack {
            VStack(spacing: 30) {
                Text(tips[step].0)
                    .font(.title)
                    .bold()
                    .foregroundColor(.white)

                Spacer()

                VStack {
                    Text(tips[step].1)
                        .multilineTextAlignment(.center)
                        .foregroundColor(.white)
                        .bold()

                    HStack {
                        if step > 0 {
                            Button("Back") { step -= 1 }
                                .foregroundColor(.white)
                                .bold()
                        }

                        Spacer()

                        Button(step == tips.count - 1 ? "Done" : "Next") {
                            if step < tips.count - 1 {
                                step += 1
                            }
                            else {
                                navigateToMain = true
                            }
                        }
                        .foregroundColor(.white)
                        .bold()
                    }
                    .padding(.top, 30)
                    
                    NavigationLink(destination: MainView().navigationBarBackButtonHidden(true), isActive: $navigateToMain) {
                        EmptyView()
                    }
                }
                .frame(maxHeight: .infinity, alignment: .center)
            }
            
            .padding()
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color.blue.ignoresSafeArea())
        }
    }
}
#Preview {
    TutorialView()
}
