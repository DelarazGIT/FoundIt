//
//  FoundItApp.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/23/25.
//
                                                                                                    
import SwiftUI





@main
struct FoundItApp: App {
    @AppStorage("hasLaunchedBefore") var hasLaunchedBefore: Bool = false
    var body: some Scene {
        WindowGroup {
            if hasLaunchedBefore {
                MainView()
            } else {
                TutorialView()
                .onAppear {
                    hasLaunchedBefore = true
                }
            }
        }
    }
}
