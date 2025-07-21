//
//  MainView.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/24/25.
//

import SwiftUI

struct MainView: View {
    @State private var showingUploadModal = false
    @StateObject private var viewModel = ContentViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack {
                    ForEach(viewModel.items) { item in
                        CatalogItemView(item: item)
                    }
                }
            }
            .navigationTitle("Catalog")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        showingUploadModal = true
                    }) {
                        Text("Add Item")
                        Image(systemName: "plus.app")
                    }
                }
            }
            .fullScreenCover(isPresented: $showingUploadModal) {
                UploadItemView(viewModel: viewModel)
            }
        }
    }
}


#Preview {
    MainView()
}
