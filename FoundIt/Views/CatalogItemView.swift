//
//  CatologItemView.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/25/25.
//

import SwiftUI

struct CatalogItemView: View {
    let item: CatalogItem
    var body: some View {
        NavigationStack {
            NavigationLink {
                CatalogItemDetailedView(item: item)
            } label: {
                HStack {
                    VStack {
                        item.image
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(height: 120)
                            .cornerRadius(10)
                            .frame(maxWidth: .infinity)
                        
                        Text(item.name)
                            .font(.headline)
                            .padding(.top, 5)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(.secondarySystemBackground))
                            .shadow(radius: 3)
                    )
                    .frame(maxWidth: .infinity)
                }
                .padding(.horizontal)
            }
        }
    }
}

#Preview {
    CatalogItemView(item: CatalogItem(name: "Example", image: Image("photo1"), placedAtNow: "Go", found: "here"))
}
